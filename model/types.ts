export enum CutoutTypeAnnotation {
  ARRAY,
  BOOLEAN,
  ELEMENT,
  FRAGMENT,
  FUNCTION,
  GENERATOR,
  NULL,
  NUMBER,
  OBJECT,
  PROPERTY,
  STRING,
  SYMBOL,
  UNDEFINED,
  UNKNOWN,
}

export type AnyCutoutToken<
  A extends CutoutTypeAnnotation = CutoutTypeAnnotation.UNKNOWN,
  T = unknown,
> = [A, T];

export type UnknownCutoutToken = AnyCutoutToken<
  CutoutTypeAnnotation.UNKNOWN,
  unknown
>;

export type CutoutNumberToken = AnyCutoutToken<
  CutoutTypeAnnotation.NUMBER,
  number
>;
export type CutoutStringToken = AnyCutoutToken<
  CutoutTypeAnnotation.STRING,
  string
>;
export type CutoutBooleanToken = AnyCutoutToken<
  CutoutTypeAnnotation.BOOLEAN,
  boolean
>;
export type CutoutObjectToken = AnyCutoutToken<
  CutoutTypeAnnotation.OBJECT,
  object
>;
export type CutoutFunctionToken = AnyCutoutToken<CutoutTypeAnnotation.FUNCTION, Function>;
export type CutoutElementToken = AnyCutoutToken<
  CutoutTypeAnnotation.ELEMENT,
  string
>;
export type CutoutPropertyToken = AnyCutoutToken<
  CutoutTypeAnnotation.PROPERTY,
  string
>;
export type CutoutFragmentToken = AnyCutoutToken<
  CutoutTypeAnnotation.FRAGMENT,
  null
>;
export type CutoutArrayToken = AnyCutoutToken<
  CutoutTypeAnnotation.ARRAY,
  Array<unknown>
>;
export type CutoutNullToken = AnyCutoutToken<CutoutTypeAnnotation.NULL, null>;
export type CutoutUndefinedToken = AnyCutoutToken<
  CutoutTypeAnnotation.UNDEFINED,
  undefined
>;
export type CutoutSymbolToken = AnyCutoutToken<
  CutoutTypeAnnotation.SYMBOL,
  symbol
>;
export type CutoutGeneratorToken = AnyCutoutToken<
  CutoutTypeAnnotation.GENERATOR,
  Generator<ValidCutoutToken>
>;

export type ValidCutoutToken =
  | CutoutArrayToken
  | CutoutBooleanToken
  | CutoutElementToken
  | CutoutFragmentToken
  | CutoutFunctionToken
  | CutoutGeneratorToken
  | CutoutNullToken
  | CutoutNumberToken
  | CutoutObjectToken
  | CutoutPropertyToken
  | CutoutStringToken
  | CutoutSymbolToken
  | CutoutUndefinedToken;
