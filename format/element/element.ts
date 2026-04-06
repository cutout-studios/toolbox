import { CutoutTokenType } from "@cutout/jsx/tokens";
import type { CutoutFormatter } from "../types.ts";

// TODO: Fragment
export const element: CutoutFormatter<HTMLElement> = ([, generator]) => {
  const dom = globalThis.document.createDocumentFragment();

  let currentAttribute: string | null = null;
  let currentElement: HTMLElement | null = null;
  const elementStack: HTMLElement[] = [];
  for (const [type, value] of generator) {
    switch (type) {
      case CutoutTokenType.ELEMENT_OPEN: {
        const previousElement = currentElement ?? dom;
        currentElement = globalThis.document.createElement(value);
        previousElement?.appendChild(currentElement as HTMLElement);
        elementStack.push(currentElement as HTMLElement);
        break;
      }
      case CutoutTokenType.ELEMENT_CLOSE: {
        elementStack.pop();
        currentElement = elementStack.at(-1) ?? null;
        break;
      }
      case CutoutTokenType.PROPERTY: {
        if (value === "children") {
          currentAttribute = null;
        } else {
          currentAttribute = value;
        }
        break;
      }
      case CutoutTokenType.NUMBER:
      case CutoutTokenType.STRING: {
        if (currentAttribute) {
          currentElement?.setAttribute(currentAttribute, String(value));
        } else {
          currentElement?.appendChild(
            globalThis.document.createTextNode(String(value)),
          );
        }
        break;
      }
      case CutoutTokenType.BOOLEAN: {
        if (currentAttribute && value) {
          currentElement?.setAttribute(currentAttribute, "");
        }
        break;
      }
      case CutoutTokenType.OBJECT:
      case CutoutTokenType.ARRAY:
        if (currentAttribute) {
          Object.defineProperty(currentElement, currentAttribute, {
            value,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        } else {
          currentElement?.appendChild(
            globalThis.document.createTextNode(JSON.stringify(value)),
          );
        }
        break;
      case CutoutTokenType.FUNCTION:
        currentElement?.addEventListener(
          currentAttribute!,
          value as EventListener,
        );
        break;
      case CutoutTokenType.SYMBOL:
      case CutoutTokenType.NULL:
      case CutoutTokenType.UNDEFINED:
      default:
        break;
    }
  }

  return dom.children.item(0) as HTMLElement;
};
