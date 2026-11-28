/**
 * Content of a `data-tip` element (JSON: { text?, label, items: [{ name, color?, href? }], note? }),
 * shared by the hover tooltip (Tooltip.astro) and the bottom sheet on touch (TipSheet.astro). Both render it into the same four elements: .tip-text, .tip-label,
 * .tip-list and .tip-note.
 */
export interface TipData {
  text?: string;
  label: string;
  items: { name: string; color?: string; href?: string }[];
  note?: string;
}

/** Plain strings (not JSON) become a single item. */
export function parseTip(el: HTMLElement): TipData {
  try {
    return JSON.parse(el.dataset.tip ?? '');
  } catch {
    return { label: '', items: [{ name: el.dataset.tip ?? '' }] };
  }
}

/**
 * Fills the four elements inside `root`; empty parts are hidden. With `links`, items with an
 * `href` become links (the bottom sheet; the hover tooltip can't be clicked).
 */
export function renderTip(root: HTMLElement, data: TipData, { links = false } = {}) {
  const text = root.querySelector<HTMLElement>('.tip-text')!;
  const label = root.querySelector<HTMLElement>('.tip-label')!;
  const list = root.querySelector<HTMLElement>('.tip-list')!;
  const note = root.querySelector<HTMLElement>('.tip-note')!;
  text.textContent = data.text ?? '';
  text.hidden = !data.text;
  label.textContent = data.label;
  label.hidden = !data.label;
  note.textContent = data.note ?? '';
  note.hidden = !data.note;
  list.replaceChildren(
    ...data.items.map((item) => {
      const li = document.createElement('li');
      if (links && item.href) {
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.name;
        li.append(a);
      } else li.textContent = item.name;
      if (item.color) li.style.setProperty('--dot', item.color);
      return li;
    }),
  );
}
