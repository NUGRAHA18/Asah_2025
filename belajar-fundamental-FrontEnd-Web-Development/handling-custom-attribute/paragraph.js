class paragraph extends HTMLElement {
  static observedAttributes = ["color", "size"];
  constructor() {
    super();
    this._color = this.getAttribute("color");
    this._size = this.getAttribute("size");
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    console.log("nama lokal name : ", this.localName);
    this._style.textContent = `
      ${this.localName} {
        color: ${this._color};
        font-size: ${this._size}px;
      }
    `;
  }

  render() {
    this.updateStyle();
    this.innerHTML = `
     ${this._style.outerHTML}
      Aku adalah custom element paragraf dengan atribut 
      color \`${this._color}\` dan 
      size \`${this._size}\`.
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Atribut ${name} diubah.`);
    console.log(`Nilai lama adalah ${oldValue}`);
    console.log(`Nilai baru adalah ${newValue}`);
    this[`_${name}`] = newValue;
    this.render();
  }
}
customElements.define("my-paragraph", paragraph);
