/** @jsxImportSource @cutout/jsx */

import { BaseElement } from "../app/base.ts";

export class ExampleElement extends BaseElement {
  static observedAttributes = ["color"];

  randomizeColor = () => {
    console.log("called");
    this.setAttribute(
      "color",
      `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    );
  };

  render({ color = "black" }) {
    return (
      <>
        <style>{/* css */ `h1 { color: ${color}; }`}</style>
        <h1>Hello, World!</h1>
        <button type="button" onClick={this.randomizeColor}>
          Randomize Color
        </button>
      </>
    );
  }
}

customElements.define("example-element", ExampleElement);
