import {
  type CutoutGeneratorToken,
  CutoutTokenType,
  type ValidCutoutToken,
} from "@cutout/jsx/tokens";
import { decode } from "@std/msgpack";

export const unpack = (data: Uint8Array): CutoutGeneratorToken => {
  const [typeIndex, valueIndex, tokenData] = decode(data) as [
    number[],
    Uint8Array[],
    number[],
  ];

  return [
    CutoutTokenType.GENERATOR,
    (function* unpackedGenerator() {
      for (const valueId of tokenData) {
        const type = typeIndex[valueId];
        const value = valueIndex[valueId];

        switch (type) {
          case CutoutTokenType.ELEMENT_OPEN:
          case CutoutTokenType.ELEMENT_CLOSE:
          case CutoutTokenType.PROPERTY:
          case CutoutTokenType.STRING:
          case CutoutTokenType.NUMBER:
          case CutoutTokenType.BOOLEAN:
          case CutoutTokenType.NULL:
            yield [type, decode(value)] as ValidCutoutToken;
            break;
          case CutoutTokenType.UNDEFINED:
            yield [type, undefined] as ValidCutoutToken;
            break;
          case CutoutTokenType.SYMBOL:
            yield [
              type,
              Symbol.for(decode(value) as string),
            ] as ValidCutoutToken;
            break;
          case CutoutTokenType.ARRAY:
          case CutoutTokenType.OBJECT: {
            let decodedValue = decode(value);

            if (typeof decodedValue === "string") {
              decodedValue = JSON.parse(decodedValue);
            }

            yield [type, decodedValue] as ValidCutoutToken;
            break;
          }
          default:
            throw new Error(`Unknown token type during unpacking: ${type}`);
        }
      }
    })(),
  ];
};
