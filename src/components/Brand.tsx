import { Fragment, type CSSProperties } from 'react';
import { splitBrands } from '../brands';

/** Renders text with any known organisation names in their brand colour. */
export function Brandify({ text }: { text: string }) {
  return (
    <>
      {splitBrands(text).map((p, i) =>
        p.brand ? (
          <span
            key={i}
            className="brand"
            style={{ '--brand': p.brand.paper, '--brand-ink': p.brand.ink } as CSSProperties}
          >
            {p.text}
          </span>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        )
      )}
    </>
  );
}
