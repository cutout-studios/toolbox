import { TOKEN_LENGTH } from "./constants.ts";
import { type ValidCutoutToken, CutoutTypeAnnotation } from "./types.ts";


export const isValidCutoutToken = (
  value: unknown
): value is ValidCutoutToken => {
  if (!Array.isArray(value)) return false;
  if (value.length !== TOKEN_LENGTH) return false;

  switch(value[0]) {
    case CutoutTypeAnnotation.NUMBER:
      return typeof value[1] === "number";
    case CutoutTypeAnnotation.GENERATOR:
      return isGenerator(value[1]);
    // TODO: continue...
  }

  return false;
}

const isGenerator = (value: unknown): value is Generator => {
  return typeof value === "object" && value !== null && "next" in value &&
    "return" in value && "throw" in value;
};
