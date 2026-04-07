import type { CutoutGeneratorToken } from "@cutout/jsx/tokens";
import { element } from "../../main.ts";

export abstract class BaseElement extends HTMLElement {
  abstract render(props: Record<string, unknown>): CutoutGeneratorToken;

  get #attributes(): Record<string, unknown> {
    return new Proxy({}, {
      get: (_, name) => this.getAttribute(String(name)),
    });
  }

  connectedCallback() {
    this.#doRender();
  }

  attributeChangedCallback() {
    this.#doRender();
  }

  #doRender() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }

    this.shadowRoot?.replaceChildren(element(this.render(this.#attributes)));
  }
}
