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
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}.panel{background:var(--card);padding:12px;border-radius:12px}.loading, .error{text-align: center;color: var(--muted);padding: 20px;}
    .view-switcher{display:flex;gap:10px;margin:16px 0;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:10px}.view-switcher button{background:transparent;border:0;color:var(--muted);padding:4px 8px;cursor:pointer;font-size:0.9rem;border-radius:6px}.view-switcher button.active{background:rgba(255,255,255,0.05);color:#fff;font-weight:600}
    </style>
    </style>
     <div class="panel">
            <app-bar></app-bar>
            <note-form></note-form>

            <div class="view-switcher">
              <button id="viewActive" class="active">Catatan Aktif</button>
              <button id="viewArchived">Arsip</button>
            </div>

            <div class="grid" id="notesGrid"></div>
        </div>
`;
    this.state = {
      activeNotes: [],
      archivedNotes: [],
      currentView: "active",
      isLoading: true,
      error: null,
    };
  }

  //ConnectedCallback diubah menjadi async
  async connectedCallback() {
    this.$ = {
      grid: this.shadowRoot.querySelector("#notesGrid"),
      viewActiveBtn: this.shadowRoot.querySelector("#viewActive"),
      viewArchivedBtn: this.shadowRoot.querySelector("#viewArchived"),
    };

    // Event listener untuk tombol view
    this.$.viewActiveBtn.addEventListener("click", () =>
      this._changeView("active")
    );
    this.$.viewArchivedBtn.addEventListener("click", () =>
      this._changeView("archived")
    );

    // Event listener untuk aksi catatan
    this.shadowRoot.addEventListener("add-note", (e) =>
      this._add(e.detail.note)
    );
    this.shadowRoot.addEventListener("delete-note", (e) =>
      this._delete(e.detail.id)
    );
    // 2. Event listener baru untuk aksi arsip
    this.shadowRoot.addEventListener("archive-note", (e) =>
      this._archive(e.detail)
    );

    // 3. Panggil fungsi untuk mengambil SEMUA data
    await this._fetchAllNotes();
  }

  //Fungsi baru untuk mengambil semua data (aktif & arsip)
  async _fetchAllNotes() {
    try {
      this.state.isLoading = true;
      this._render();

      const [activeNotes, archivedNotes] = await Promise.all([
        NotesAPI.getNotes(),
        NotesAPI.getArchivedNotes(),
      ]);
      // TAMBAHKAN INI UNTUK MELIHAT DATA BARU DARI API
      console.log("Langkah 3: Data baru diterima dari API.", {
        activeNotes,
        archivedNotes,
      });

      this.state.activeNotes = activeNotes;
      this.state.archivedNotes = archivedNotes;
    } catch (error) {
      this.state.error = error.message;
      console.error(error);
    } finally {
      console.log("Fetch selesai. Akan memanggil RENDER dari blok finally...");
      this.state.isLoading = false;
      this._render();
    }
  }

  _changeView(view) {
    this.state.currentView = view;
    this._render();
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
  async _add(note) {
    // Siapkan payload untuk API terlebih dahulu
    const payloadForAPI = {
      title: note.title,
      body: note.body,
    };

    try {
      // 1. Langsung set loading dan render ulang untuk menampilkannya
      this.state.isLoading = true;
      this._render();

      // 2. Kirim data ke server
      await NotesAPI.addNote(payloadForAPI);

      // 3. Setelah berhasil, ambil SEMUA data terbaru (aktif dan arsip)
      await this._fetchAllNotes();
    } catch (error) {
      // 4. Jika gagal, cukup tampilkan error. Tidak perlu rollback manual.
      this.state.error = error.message;
      this.state.isLoading = false;
      this._render(); // Render ulang untuk menampilkan pesan error
      alert(`Gagal menambahkan catatan: ${error.message}`);
    }
  }
  async _delete(id) {
    console.log('Langkah 2: Handler "_delete" menerima ID:', id); // <-- TAMBAHKAN INI
    try {
      this.state.isLoading = true;
      this._render();
      await NotesAPI.deleteNote(id);
      await this._fetchNotes();
    } catch (error) {
      this.state.error = error.message;
      this.state.isLoading = false;
      this._render();
      console.error(error);
      alert(`Gagal menghapus catatan: ${error.message}`);
    }
  }

  async _archive({ id, archived }) {
    try {
      this.state.isLoading = true;
      this._render();

      if (archived) {
        await NotesAPI.unarchiveNote(id);
      } else {
        await NotesAPI.archiveNote(id);
      }

      await this._fetchAllNotes();
    } catch (error) {
      this.state.error = error.message;
      this.state.isLoading = false;
      this._render();
      alert(`Gagal mengubah status arsip: ${error.message}`);
    }
  }

  _render() {
    // Update active button
    console.log(
      "Fungsi RENDER dieksekusi. View:",
      this.state.currentView,
      "Loading:",
      this.state.isLoading
    ); // <-- TAMBAHKAN INI
    this.$.viewActiveBtn.classList.toggle(
      "active",
      this.state.currentView === "active"
    );
    this.$.viewArchivedBtn.classList.toggle(
      "active",
      this.state.currentView === "archived"
    );

    this.$.grid.innerHTML = "";
    if (this.state.isLoading) {
      this.$.grid.innerHTML = `<div class="loading">Loading...</div>`;
      return;
    }
    if (this.state.error) {
      this.$.grid.innerHTML = `<div class="error">Error: ${this.state.error}</div>`;
      return;
    }

    const notesToRender =
      this.state.currentView === "active"
        ? this.state.activeNotes
        : this.state.archivedNotes;

    if (notesToRender.length === 0) {
      const message =
        this.state.currentView === "active"
          ? "Tidak ada catatan aktif."
          : "Tidak ada catatan di arsip.";
      this.$.grid.innerHTML = `<div class="error">${message}</div>`;
      return;
    }

    notesToRender.forEach((note) => {
      const el = document.createElement("note-item");
      el.data = note;
      this.$.grid.appendChild(el);
    });
  }
}
if (!customElements.get("notes-app")) {
  customElements.define("notes-app", NotesApp);
}
