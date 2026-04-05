import { CutoutTokenType, type ValidCutoutToken } from "@cutout/jsx/tokens";
import { assertEquals, assertThrows } from "@std/assert";

import { pack } from "./pack.ts";
import { unpack } from "./unpack.ts";

const TEST_GROUP = "format/pack";

Deno.test(`${TEST_GROUP} - spot check`, () => {
  const data: ValidCutoutToken[] = [
    [CutoutTokenType.NULL, null],
    [CutoutTokenType.UNDEFINED, undefined],
    [CutoutTokenType.BOOLEAN, true],
    [CutoutTokenType.NUMBER, 123],
    [CutoutTokenType.STRING, "string"],
    [CutoutTokenType.SYMBOL, Symbol.for("symbol")],
    [CutoutTokenType.ARRAY, [1, 2, 3]],
    [CutoutTokenType.OBJECT, { a: 1, b: "two", c: false }],
  ];

  const testGenerator = (function* () {
    yield* data[Symbol.iterator]();
  })();

  const result = [
    ...(unpack(pack([CutoutTokenType.GENERATOR, testGenerator]))[1]),
  ];

  assertEquals(
    result,
    data,
  );
});

Deno.test(`${TEST_GROUP} - unsupported values`, () => {
  assertThrows(
    () =>
      pack([
        CutoutTokenType.GENERATOR,
        (function* () {
          yield [CutoutTokenType.FUNCTION, () => {}];
        })(),
      ] as [CutoutTokenType.GENERATOR, Generator<ValidCutoutToken>]),
  );

  assertThrows(
    () =>
      pack([
        CutoutTokenType.GENERATOR,
        (function* () {
          yield [
            CutoutTokenType.GENERATOR,
            (function* () {
              yield [CutoutTokenType.STRING, "nested generator"];
            })(),
          ];
        })(),
      ] as [CutoutTokenType.GENERATOR, Generator<ValidCutoutToken>]),
  );
});
