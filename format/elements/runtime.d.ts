import type {
  Attributes,
  BooleanAttributes,
  Elements,
  FunctionAttributes,
  NumberAttributes,
  PickElementAttributes,
} from "../constants/types.ts";

type AnyFunction = (...args: unknown[]) => unknown;

type ResolveSupportedAttributeType<A extends Attributes> = A extends
  BooleanAttributes ? boolean | string
  : A extends NumberAttributes ? number | string
  : A extends FunctionAttributes ? AnyFunction
  : string;

type ResolveElementAttributes<E extends Elements> =
  & {
    [
      A in Attributes as PickElementAttributes<E, A>
    ]?: ResolveSupportedAttributeType<A>;
  }
  & {
    [key: `data-${string}`]: string | number;
    key?: string | number;
  };

declare namespace JSX {
  type IntrinsicElements =
    & {
      [unknownElement: string]: unknown;
    }
    & {
      [E in Elements]: ResolveElementAttributes<E>;
    };
}
