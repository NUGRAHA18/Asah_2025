export class NoteItem extends HTMLElement {
  constructor() {
    super();
    this._data = null;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
    :host{
        display:block
    }
    .card{
        background:var(--card);
        padding:14px;
        border-radius:12px;
        box-shadow:0 6px 18px rgba(3,7,18,0.6);
        min-height:90px;
        display:flex;
        flex-direction:
        column;gap:8px
    }
    .meta{
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:.82rem;
        color:var(--muted)
    }
    .title{
        font-weight:600;
        font-size:1rem;
        margin:0
    }
    .body{
        flex:1;
        color:#dcebf7;
        font-size:.95rem;
        white-space:pre-wrap;
        overflow:hidden;
        text-overflow:ellipsis
    }
    .controls{
        display:flex;
        gap:8px;
        margin-top:8px
    }
    button{
        background:transparent;
        border:1px solid rgba(255,255,255,0.04);
        padding:6px 8px;
        border-radius:8px;
        color:var(--muted);
        cursor:pointer
    }
    button:hover{
        border-color:rgba(255,255,255,0.08)
    }
    </style>

    <article class="card">
        <div class="meta">
            <div class="date">—</div>
        </div>
        <h3 class="title"></h3>
        <div class="body"></div>
        <div class="controls">
            <button part="del">Hapus</button>
        </div>
    </article>
`;
    this.$ = {
      title: this.shadowRoot.querySelector(".title"),
      body: this.shadowRoot.querySelector(".body"),
      date: this.shadowRoot.querySelector(".date"),
      delBtn: this.shadowRoot.querySelector('button[part="del"]'),
    };
    this.$.delBtn.addEventListener("click", () => this._delete());
  }
  set data(d) {
    this._data = d;
    this.render();
  }
  render() {
    if (!this._data) return;
    this.$.title.textContent = this._data.title;
    this.$.body.textContent = this._data.body;
    this.$.date.textContent = new Date(this._data.createdAt).toLocaleString();
  }
  _delete() {
    this.dispatchEvent(
      new CustomEvent("delete-note", {
        detail: { id: this._data.id },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("note-item", NoteItem);
