const HTML = `

`;

class HackingWordleForm extends HTMLElement {
  constructor() {
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = HTML;
  }
}

customElements.define('ncp-hacking-wordle-form', HackingWordleForm)