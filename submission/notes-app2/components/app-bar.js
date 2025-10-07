export class AppBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <style>
    :host{
        display:block;
        margin-bottom:16px
    }
    header{
        display:flex;
        align-items:center;
        gap:12px
    }
    h1{
        font-size:1.2rem;
        margin:0
    }
    .subtitle{
        color:var(--muted);
        font-size:.9rem
    }
    .brand{
        display:flex;
        align-items:center;
        gap:10px
    }
    .logo{
        width:44px;
        height:44px;
        border-radius:10px;
        background:linear-gradient(135deg,var(--accent),var(--accent-2));
        display:flex;
        align-items:center;
        justify-content:center;
        font-weight:700
    }
    </style>
    <header>
        <div class="brand">
            <div class="logo">N</div>
                <div>
                    <h1>Notes App</h1>
                    <div class="subtitle">Sebuah contoh web component</div>
                </div>
        </div>
    </header>
`;
  }
}
if (!customElements.get("app-bar")) {
  customElements.define("app-bar", AppBar);
}
