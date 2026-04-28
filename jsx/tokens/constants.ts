/**
 * @packageDocumentation
 * Important constants in the @cutout/jsx runtime.
 *
 * These define the magic numbers and labels used to structure tokens and handle
 * special JSX cases.
 */

// ------------------------------------------------------------
// Token Structure
// ------------------------------------------------------------

/**
 * The expected length of a valid token.
 *
 * Tokens are structured as `[type, value]`: their length is always 2.
 * Handy for validation checks.
 *
 * @example
 * ```ts
 * const token = [0x07, 42];
 * ```
 */
export const TOKEN_LENGTH = 2;

/**
 * The index of the type discriminator in a token tuple.
 *
 * @example
 * ```ts
 * const type = token[TOKEN_TYPE_INDEX]; // 0x07 (NUMBER)
 * ```
 */
export const TOKEN_TYPE_INDEX = 0;

/**
 * The index of the payload in a token tuple.
 *
 * @example
 * ```ts
 * const value = token[TOKEN_VALUE_INDEX]; // "hello!"
 * ```
 */
export const TOKEN_VALUE_INDEX = 1;

// ------------------------------------------------------------
// Internal Labels
// ------------------------------------------------------------

/**
 * In our flat IR, child boundaries are distinguished with this label so they don't get mixed up with everything else.
 */
export const CHILDREN_LABEL = "[[CHILDREN]]";

/**
 * A `Fragment` lets you group elements without adding a node.
 * We use this label to represent a `Fragment` so we can recognize
 * and handle it during transformation.
 */
export const FRAGMENT_LABEL = "[[FRAGMENT]]";

/**
 * If we hit a value we don't know how to convert to a token (like a
 * function that isn't a component, or a circular reference), we swap
 * it out for this label during debugging/serialization so we don't crash.
 */
export const UNSERIALIZABLE_LABEL = "[[UNSERIALIZABLE]]";
