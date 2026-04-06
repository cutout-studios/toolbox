/** @jsxImportSource @cutout/jsx */

import { DOMParser } from "@b-fuze/deno-dom";

import { brotliCompressSync } from "node:zlib";
import { format as formatBytes } from "@std/fmt/bytes";

import { element } from "./element.ts";
import { wikipediaOrg } from "./bench.html.tsx";

globalThis.document = new DOMParser().parseFromString(
  "<!DOCTYPE html><html><body></body></html>",
  "text/html",
) as unknown as Document;

const BENCH_GROUP = "format/element";

Deno.bench(`${BENCH_GROUP} - single value`, () => {
  element(<div></div>).outerHTML;
});

Deno.bench(`${BENCH_GROUP} - 100 rows`, (bench) => {
  const rows = Array.from({ length: 100 }, (_, i) => ({
    id: `row-${i}`,
    class: i % 2 === 0 ? "even" : "odd",
    content: `Row #${i}`,
  }));

  bench.start();

  element(
    <div>
      {rows.map((row) => (
        <div id={row.id} class={row.class}>
          {row.content}
        </div>
      ))}
    </div>,
  ).outerHTML;

  bench.end();
});

Deno.bench(`${BENCH_GROUP} - 1000 rows, repeating`, (bench) => {
  const rows = Array.from({ length: 1000 }, () => ({
    content: "Row",
  }));

  bench.start();

  element(
    <div>
      {rows.map((row) => <div key={null}>{row.content}</div>)}
    </div>,
  ).outerHTML;

  bench.end();
});

Deno.bench(`${BENCH_GROUP} - 1000 rows, varied`, (bench) => {
  const rows = Array.from({ length: 1000 }, (_, i) => ({
    id: `row-${i}`,
    class: i % 2 === 0 ? "even" : "odd",
    content: `Row #${i} - ${Math.random()}`,
  }));

  bench.start();

  element(
    <div>
      {rows.map((row) => (
        <div id={row.id} class={row.class}>
          {row.content}
        </div>
      ))}
    </div>,
  ).outerHTML;

  bench.end();
});


let wikiSize: number | null = null;

Deno.bench(
  `${BENCH_GROUP} - wikipedia.org (no style/script tags)`,
  (bench) => {
    if (wikiSize === null) {
      const wikiData = element(wikipediaOrg()).outerHTML
      const encoder = new TextEncoder();
      wikiSize = encoder.encode(wikiData).byteLength;
      console.info(`[html size]: ${formatBytes(wikiSize)}`);
      console.info(
        `[html + br size]: ${
          formatBytes(brotliCompressSync(wikiData).byteLength)
        }`,
      );
    }

    bench.start();
    element(wikipediaOrg()).outerHTML;
    bench.end();
  },
);

let largeDataSize: number | null = null;

Deno.bench(`${BENCH_GROUP} - 10000 rows`, (bench) => {
  const rows = Array.from({ length: 10000 }, (_, i) => ({
    id: `row-${i}`,
    class: i % 2 === 0 ? "even" : "odd",
    content: `Row #${i}`,
  }));

  if (largeDataSize === null) {
    const largeData = element(
      <div>
        {rows.map((row) => (
          <div id={row.id} class={row.class}>
            {row.content}
          </div>
        ))}
      </div>,
    ).outerHTML;

    const encoder = new TextEncoder();
    largeDataSize = encoder.encode(largeData).byteLength;

    console.info(`[html size]: ${formatBytes(largeDataSize)}`);
    console.info(
      `[html + br size]: ${
        formatBytes(brotliCompressSync(largeData).byteLength)
      }`,
    );
  }

  bench.start();

  element(
    <div>
      {rows.map((row) => (
        <div id={row.id} class={row.class}>
          {row.content}
        </div>
      ))}
    </div>,
  ).outerHTML;

  bench.end();
});
