/**
 * Shiki transformer for Markdown/MDX code blocks: wraps each block in a frame with a header
 * (title, language, copy button) and switches line numbers on or off.
 *
 * Options go after the language in the fence:
 *
 *   ```ts title="src/theme/color.ts"   → title in the header
 *   ```bash nolines                    → no line numbers (default: on for blocks with 2+ lines)
 *   ```ts lines                        → line numbers even for a single line
 *
 * The copy button gets its labels and behavior from src/components/CodeCopy.astro.
 * Styles: `.code-block` in src/styles/global.css.
 */
import type { ShikiTransformer } from 'shiki';
import type { Element, ElementContent } from 'hast';

/** Display names; anything else shows the id upper-cased. */
const languageNames: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  css: 'CSS',
  scss: 'SCSS',
  html: 'HTML',
  astro: 'Astro',
  json: 'JSON',
  md: 'Markdown',
  markdown: 'Markdown',
  mdx: 'MDX',
  yaml: 'YAML',
  yml: 'YAML',
  sh: 'Shell',
  bash: 'Shell',
  zsh: 'Shell',
  shell: 'Shell',
  diff: 'Diff',
};
/** Languages that get no label. */
const unlabeled = new Set(['plaintext', 'text', 'txt', 'plain']);

const el = (
  tagName: string,
  properties: Element['properties'],
  children: ElementContent[] = [],
): Element => ({
  type: 'element',
  tagName,
  properties,
  children,
});
const text = (value: string): ElementContent => ({ type: 'text', value });

/** The copy icon used by the contact block's copy button too. */
const copyIcon = el('svg', { viewBox: '0 0 24 24', ariaHidden: 'true' }, [
  el('rect', { x: '9', y: '9', width: '11', height: '11', rx: '2' }),
  el('path', { d: 'M5 15V6a2 2 0 0 1 2-2h9' }),
]);

export function codeBlocks(): ShikiTransformer {
  return {
    name: 'weblogixx:code-blocks',
    root(root) {
      const pre = root.children.find((n): n is Element => n.type === 'element' && n.tagName === 'pre');
      if (!pre) return;

      // Shiki's name for the raw meta string after the language.
      // oxlint-disable-next-line no-underscore-dangle
      const meta = this.options.meta?.__raw ?? '';
      const title = /title=(["'])(.*?)\1/.exec(meta)?.[2];
      const lang = this.options.lang;
      const label = unlabeled.has(lang) ? undefined : (languageNames[lang] ?? lang.toUpperCase());
      const lineCount = this.source.split('\n').length;
      const lines = /\bnolines\b/.test(meta) ? false : /\blines\b/.test(meta) || lineCount > 1;

      const head = el('div', { className: ['code-head'] }, [
        el('span', { className: ['code-title'] }, title ? [text(title)] : []),
        ...(label ? [el('span', { className: ['code-lang'] }, [text(label)])] : []),
        el('button', { type: 'button', className: ['code-copy'], dataCodeCopy: '' }, [
          copyIcon,
          el('span', { className: ['copied'], ariaLive: 'polite' }),
        ]),
      ]);

      root.children = [
        el(
          'div',
          {
            className: ['code-block'],
            dataLines: lines ? '' : undefined,
            // Gutter wide enough for the highest line number.
            style: lines ? `--ln-digits:${String(lineCount).length}` : undefined,
          },
          [head, pre],
        ),
      ];
    },
  };
}
