/** @jsx @cutout/jsx */

import type { CutoutGeneratorToken, ValidCutoutToken } from "@cutout/jsx/model";
import { assertSnapshot } from "@std/testing/snapshot";

// TODO: JSX.IntrinsicElements
// TODO: "unfurl" generator
// TODO: custom serializer?
const _expand = (generatorToken: CutoutGeneratorToken): ValidCutoutToken[] => {
  return [...generatorToken[1]];
};

Deno.test("jsx - simple case", () => {
  assertSnapshot(_expand(<div></div>));
});

Deno.test("jsx - props", () => {
  assertSnapshot(
    _expand(<div style={{ color: "red" }} id="my-cool-div"></div>),
  );
});

Deno.test("jsx - children", () => {
  assertSnapshot(_expand(
    <ul>
      <li>Child #1</li>
      <li>Child #2</li>
      <li>Child #3</li>
    </ul>,
  ));
});

// Deno.test("jsx - children + props", () => {
// });

// Deno.test("jsx - nested children", () => {
// });

// Deno.test("jsx - nested children with props", () => {
// });

// Deno.test("jsx - fragment", () => {
// });
