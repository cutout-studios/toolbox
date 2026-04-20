import type { CutoutGeneratorToken } from "@cutout/jsx/tokens";

type CutoutCacheConfig<T> = {
  ttlMS?: number;
  watch?: () => T;
};

export function createCache<T>(config: CutoutCacheConfig<T> = {}) {
  let cachedInput: T | undefined,
    cachedOutput: CutoutGeneratorToken | undefined,
    lastRendered: number;

  function cache(
    render: (input: T | undefined) => CutoutGeneratorToken,
  ) {
    const hasInput = cachedInput !== undefined;
    const hasOutput = cachedOutput !== undefined;
    const hasTimedout = config.ttlMS !== undefined &&
      Date.now() - lastRendered < config.ttlMS;

    if (hasOutput && hasTimedout) return cachedOutput;

    const currentInput = config.watch?.();

    if (
      hasOutput && hasInput && cachedInput === currentInput &&
      !hasTimedout
    ) {
      return cachedOutput;
    }

    cachedInput = currentInput;
    cachedOutput = render(currentInput);
    lastRendered = Date.now();

    return cachedOutput;
  }

  return Object.assign(cache, {
    clear() {
      cachedInput = undefined;
      cachedOutput = undefined;
      lastRendered = 0;
    },
  });
}
