export class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
    form{
        background:rgba(255,255,255,0.02);
        padding:14px;
        border-radius:12px
    }
    label{
        display:block;
        font-size:.85rem;
        margin-bottom:6px;
        color:var(--muted)
    }
    input,textarea{
        width:100%;
        padding:10px;
        border-radius:8px;
        background:transparent;
        border:1px solid rgba(255,255,255,0.04);
        color:var(--muted)
    }
    textarea{
        min-height:90px
    }
    .actions{
        display:flex;
        justify-content:
        flex-end;
        margin-top:10px
    }
    button{
        background:linear-gradient(90deg,var(--accent),var(--accent-2));
        border:0;
        padding:8px 12px;
        border-radius:10px;
        color:#051023;
        font-weight:600;
        cursor:pointer
    }
    </style>

    <form>
        <label>Judul</label>
        <input name="title" type="text" />
        <label>Isi</label>
        <textarea name="body"></textarea>
        <div class="actions">
            <button type="submit">Tambah</button>
        </div>
    </form>
`;
    this.$ = {
      form: this.shadowRoot.querySelector("form"),
      title: this.shadowRoot.querySelector('input[name="title"]'),
      body: this.shadowRoot.querySelector('textarea[name="body"]'),
    };
    this.$.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._onSubmit();
    });
  }
  _onSubmit() {
    const note = {
      id: Date.now().toString(),
      title: this.$.title.value,
      body: this.$.body.value,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    this.dispatchEvent(
      new CustomEvent("add-note", {
        detail: { note },
        bubbles: true,
        composed: true,
      })
    );
    this.$.title.value = "";
    this.$.body.value = "";
  }
}
customElements.define("note-form", NoteForm);
