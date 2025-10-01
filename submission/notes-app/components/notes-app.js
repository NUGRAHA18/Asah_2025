import { notesData } from "../data.js";
import "./app-bar.js";
import "./note-item.js";
import "./note-form.js";

export class NotesApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
    .grid{
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(250px,1fr));
        gap:14px
    }
    .panel{
        background:var(--card);
        padding:12px;
        border-radius:12px
    }
    </style>
        <div class="panel">
            <app-bar></app-bar>
            <note-form></note-form>
            <div class="grid" id="notesGrid"></div>
        </div>
`;
    this.state = { notes: [...notesData] };
  }
  connectedCallback() {
    this.$ = { grid: this.shadowRoot.querySelector("#notesGrid") };
    this._render();
    this.shadowRoot.addEventListener("add-note", (e) => {
      this._add(e.detail.note);
    });
    this.shadowRoot.addEventListener("delete-note", (e) => {
      this._delete(e.detail.id);
    });
  }
  _add(note) {
    this.state.notes.unshift(note);
    this._render();
  }
  _delete(id) {
    this.state.notes = this.state.notes.filter((n) => n.id !== id);
    this._render();
  }
  _render() {
    this.$.grid.innerHTML = "";
    for (const note of this.state.notes) {
      const el = document.createElement("note-item");
      el.data = note;
      this.$.grid.appendChild(el);
    }
  }
}
customElements.define("notes-app", NotesApp);
