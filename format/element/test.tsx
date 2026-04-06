/** @jsxImportSource @cutout/jsx */

import { DOMParser } from "@b-fuze/deno-dom";
import { assertSnapshot } from "@std/testing/snapshot";
import { element } from "./main.ts";

globalThis.document = new DOMParser().parseFromString(
  "<!DOCTYPE html><html><body></body></html>",
  "text/html",
) as unknown as Document;

Deno.test("element - simple element", async (test) => {
  await assertSnapshot(test, element(<div></div>).outerHTML);
});

Deno.test("element - nested elements", async (test) => {
  await assertSnapshot(
    test,
    element(
      <div>
        <span>Test</span>
      </div>,
    ).outerHTML,
  );
});

Deno.test("element - attributes", async (test) => {
  await assertSnapshot(
    test,
    element(
      <div id="test" class="example" data-value="123">
        Test
      </div>,
    ).outerHTML,
  );
});

Deno.test("element - boolean attributes", async (test) => {
  await assertSnapshot(
    test,
    element(
      <input type="checkbox" checked disabled />,
    ).outerHTML,
  );
});

Deno.test("element - fragment", async (test) => {
  await assertSnapshot(
    test,
    element(
      <>
        <div>First</div>
        <div>Second</div>
      </>,
    ).outerHTML,
  );
});
