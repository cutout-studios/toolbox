import {
  type CutoutElementToken,
  type CutoutGeneratorToken,
  type CutoutPropertyToken,
  CutoutTypeAnnotation,
  isValidCutoutToken,
  TOKEN_ANNOTATION_INDEX,
  TOKEN_VALUE_INDEX,
  tokenizeValue,
} from "@cutout/jxs/model";

export const Fragment = [CutoutTypeAnnotation.FRAGMENT, null];

export const jsx = (
  type: string,
  props: { [key: string]: unknown },
): CutoutGeneratorToken => {
  const _generator = function* () {
    yield [CutoutTypeAnnotation.ELEMENT, type] as CutoutElementToken;

    for (const key in props) {
      yield [CutoutTypeAnnotation.PROPERTY, key] as CutoutPropertyToken;

      let value = props[key];

      if (!Array.isArray(value)) {
        value = [value];
      }

      for (const entry of value as unknown[]) {
        const isValidToken = isValidCutoutToken(entry);

        if (
          isValidToken &&
          entry[TOKEN_ANNOTATION_INDEX] === CutoutTypeAnnotation.GENERATOR
        ) {
          for (const generatorToken of entry[TOKEN_VALUE_INDEX]) {
            yield generatorToken;
          }
          continue;
        }

        if (isValidToken) {
          yield entry;
          continue;
        }

        const token = tokenizeValue(entry);

        if (token[TOKEN_ANNOTATION_INDEX] === CutoutTypeAnnotation.UNKNOWN) {
          // TODO: attempt to serialize value in jsxDEV
          continue;
        }

        yield token;
      }
    }
  };

  return [CutoutTypeAnnotation.GENERATOR, _generator()];
};

// Just pass these through for now
export const jsxs = jsx;
export const jsxDEV = jsx;
