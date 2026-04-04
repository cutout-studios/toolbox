import {
  type CutoutElementCloseToken,
  type CutoutElementOpenToken,
  type CutoutGeneratorToken,
  type CutoutPropertyToken,
  CutoutTokenType,
  isValidCutoutToken,
  TOKEN_ANNOTATION_INDEX,
  TOKEN_VALUE_INDEX,
  tokenizeValue,
} from "@cutout/jsx/model";

// Must declare a namespace here for JSX to function.
// deno-lint-ignore no-namespace
export namespace JSX {
  // Interpreters decide which nodes are valid.
  export interface IntrinsicElements {
    [elementTag: string]: Record<string, unknown>;
  }
}

export const Fragment = "[FRAGMENT]";

export const jsx = (
  type: string,
  props: { [key: string]: unknown }
): CutoutGeneratorToken => {
  const _generator = function* () {
    yield [CutoutTokenType.ELEMENT_OPEN, type] as CutoutElementOpenToken;

    for (const key in props) {
      yield [CutoutTokenType.PROPERTY, key] as CutoutPropertyToken;

      for (const token of _forwardTokens(props[key])) yield token;
    }

    yield [CutoutTokenType.ELEMENT_CLOSE, type] as CutoutElementCloseToken;
  };

  return [CutoutTokenType.GENERATOR, _generator()];
};

// Just pass these through for now
export const jsxs = jsx;
export const jsxDEV = jsx;

function* _forwardTokens(value: unknown, debug = false) {
  const isValidToken = isValidCutoutToken(value);

  // TODO: flatten arrays of children
  if (
    isValidToken &&
    value[TOKEN_ANNOTATION_INDEX] === CutoutTokenType.GENERATOR
  ) {
    for (const generatorToken of value[TOKEN_VALUE_INDEX]) {
      yield generatorToken;
    }
    return;
  }

  if (isValidToken) {
    yield value;
    return;
  }

  const token = tokenizeValue(value);

  if (token[TOKEN_ANNOTATION_INDEX] === CutoutTokenType.UNKNOWN) {
    if (debug) {
      let unknownValue;

      try {
        unknownValue = JSON.stringify(value);
      } catch {
        unknownValue = "[UNSERIALIZABLE]";
      }

      console.warn(`Encountered unknown value "${unknownValue}". Skipping.`);
    }
    return;
  }

  yield token;
  return;
}
