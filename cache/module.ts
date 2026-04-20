import { CutoutTokenType, TOKEN_VALUE_INDEX } from "@cutout/jsx/tokens";
import type {
  CutoutGeneratorToken,
  CutoutOutputToken,
} from "@cutout/jsx/tokens";

export type CutoutCacheConfig<T> = {
  ttlMS?: number;
  watch?: () => T;
  compare?: (a: T, b: T) => boolean;
};

export function createCache<T>(
  { ttlMS, watch, compare = (a, b) => a === b }: CutoutCacheConfig<T> = {},
) {
  let cachedInput: T | undefined,
    cachedOutput: CutoutOutputToken[] | undefined,
    lastRendered: number;

  function cache(
    render: (input: T | undefined) => CutoutGeneratorToken,
  ): CutoutGeneratorToken {
    const hasTimedout = ttlMS !== undefined &&
      Date.now() - lastRendered < ttlMS;

    const createOutputGenerator = (): CutoutGeneratorToken => [
      CutoutTokenType.GENERATOR,
      (function* () {
        yield* cachedOutput!;
      })(),
    ];

    if (cachedOutput !== undefined && hasTimedout) {
      return createOutputGenerator();
    }

    const currentInput = watch?.();

    if (
      cachedOutput !== undefined && cachedInput !== undefined &&
      currentInput !== undefined &&
      compare(cachedInput, currentInput) &&
      !hasTimedout
    ) {
      return createOutputGenerator();
    }

    cachedInput = currentInput;
    cachedOutput = [...(render(currentInput)[TOKEN_VALUE_INDEX])];
    lastRendered = Date.now();

    return createOutputGenerator();
  }

  return Object.assign(cache, {
    clear() {
      cachedInput = undefined;
      cachedOutput = undefined;
      lastRendered = 0;
    },
  });
}
