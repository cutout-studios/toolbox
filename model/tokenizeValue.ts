import { type ValidCutoutToken, CutoutTypeAnnotation, type UnknownCutoutToken } from "@cutout/jsx/model";

export const tokenizeValue = (value: unknown): ValidCutoutToken | UnknownCutoutToken => {
  switch (typeof value) {
    case "bigint":
    case "number":
      return [CutoutTypeAnnotation.NUMBER, value as number];
    case "string":
      return [CutoutTypeAnnotation.STRING, value as string];
    case "boolean":
      return [CutoutTypeAnnotation.BOOLEAN, value as boolean];
    case "symbol":
      return [CutoutTypeAnnotation.SYMBOL, value as symbol];
    case "undefined":
      return [CutoutTypeAnnotation.UNDEFINED, undefined];
    case "function":
      return [CutoutTypeAnnotation.FUNCTION, value];
    case "object":
      if (value === null) {
        return [CutoutTypeAnnotation.NULL, null];
      } else if (Array.isArray(value)) {
        return [CutoutTypeAnnotation.ARRAY, value];
      }
      
      return [CutoutTypeAnnotation.OBJECT, value];
    default:
      return [CutoutTypeAnnotation.UNKNOWN, value];
  }
};
