import "./app-bar.js";
import "./note-item.js";
import "./note-form.js";
import NotesAPI from "../src/api.js";

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
    this.state = {
      notes: [],
      isLoading: true,
      error: null,
    };
  }

  //ConnectedCallback diubah menjadi async
  async connectedCallback() {
    this.$ = { grid: this.shadowRoot.querySelector("#notesGrid") };
    this.shadowRoot.addEventListener("add-note", (e) => {
      this._add(e.detail.note);
    });
    this.shadowRoot.addEventListener("delete-note", (e) => {
      this._delete(e.detail.id);
    });

    // Panggil fungsi untuk mengambil data dari API
    await this._fetchNotes();
  }

  //Fungsi baru untuk mengambil data
  async _fetchNotes() {
    try {
      const notes = await NotesAPI.getNotes();
      this.state.notes = notes;
    } catch (error) {
      this.state.error = error.message;
      console.error(error);
    } finally {
      this.state.isLoading = false;
      this._render();
    }
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

    if (this.state.isLoading) {
      this.$.grid.innerHTML = `<div class="loading">Loading notes...</div>`;
      return;
    }

    if (this.state.error) {
      this.$.grid.innerHTML = `<div class="error">Error: ${this.state.error}</div>`;
      return;
    }

    if (this.state.notes.length === 0) {
      this.$.grid.innerHTML = `<div class="error">Tidak ada catatan untuk ditampilkan.</div>`;
      return;
    }

    for (const note of this.state.notes) {
      const el = document.createElement("note-item");
      el.data = note;
      this.$.grid.appendChild(el);
    }
  }
}
customElements.define("notes-app", NotesApp);
