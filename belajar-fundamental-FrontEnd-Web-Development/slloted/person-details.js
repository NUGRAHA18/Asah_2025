class PersonDetails extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this._title = this.getAttribute("title");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      div {
        margin: 10px;
        padding: 10px;
        border: 1px solid gray;

        width: 200px;
      }
  
      h2 {
        margin: 0 0 10px;
      }
  
      ul {
        margin: 0;
      }
  
      p {
        margin: 10px 0;
      }
  
      ::slotted(*) {
        color: gray;
        font-family: sans-serif;
      }
    `;
  }

  render() {
    this.updateStyle();

    const template = `
      ${this._style.outerHTML}
      
      <div>
        <h2>"${this._title}"</h2>
        <slot name="person-name">name missign</slot>
        <ul>
          <li><slot name="person-age">AGE MISSING</slot></li>
          <li><slot name="person-occupation">OCCUPATION MISSING</slot></li>
        </ul>
      </div>
    `;

    this._shadowRoot.innerHTML = template;
  }
}

customElements.define("person-details", PersonDetails);
