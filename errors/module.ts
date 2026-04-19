export enum CutoutErrorCode {
  DATA_UNKNOWN = "DATA_UNKNOWN",
  DATA_INSECURE_OP = "DATA_INSECURE_OP",
}

type CutoutErrorOptions = {
  code: CutoutErrorCode;
  guidance?: string;
  location?: string;
  context?: unknown;
} & ErrorOptions;

const humanTranslation = {
  [CutoutErrorCode.DATA_UNKNOWN]: "@cutout/jsx has encountered unknown data.",
  [CutoutErrorCode.DATA_INSECURE_OP]:
    "@cutout/jsx was requested to perform an insecure operation.",
};

export class CutoutError extends Error {
  location?: string;
  context?: unknown;
  guidance?: string;

  constructor(
    { code, guidance, location, context, ...options }: CutoutErrorOptions,
  ) {
    let message = `[${code}] ${humanTranslation[code]}`;

    if (location) {
      // ...
    }

    if (context) {
      // ...
    }

    if (guidance) {
      message += guidance.trim();
    }

    super(message, options);

    this.message = message;
    this.location = location;
    this.context = context;
    this.guidance = guidance;
  }
}
