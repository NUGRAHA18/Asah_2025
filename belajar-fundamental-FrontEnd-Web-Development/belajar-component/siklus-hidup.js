class MyCounter extends HTMLElement {
  // Properti untuk menyimpan ID interval timer
  timerId;

  // #5. observedAttributes
  // Atribut yang kita ingin browser awasi perubahannya
  static get observedAttributes() {
    return ["start-count"];
  }

  // #1. constructor()
  constructor() {
    // Selalu panggil super() terlebih dahulu
    super();
    console.log("✅ 1. Constructor: Komponen dibuat di memori.");

    // Inisialisasi properti atau Shadow DOM (jika ada)
    this.initialCount = 0;
    this.currentCount = 0;
  }

  // #2. connectedCallback()
  connectedCallback() {
    console.log("🔗 2. connectedCallback: Komponen terhubung ke DOM.");

    // Mengatur tampilan awal
    this.innerHTML = `
      <p>Saya adalah MyCounter. Saya sudah hidup selama: <strong>${this.currentCount}</strong> detik.</p>
    `;

    // Mulai timer (logika utama)
    this.timerId = setInterval(() => {
      this.currentCount++;
      this.querySelector("strong").textContent = this.currentCount;
    }, 1000);
  }

  // #3. disconnectedCallback()
  disconnectedCallback() {
    console.log(
      "❌ 3. disconnectedCallback: Komponen dilepas dari DOM. Melakukan pembersihan!"
    );

    // Tugas pembersihan: Hentikan interval untuk menghindari memory leak
    clearInterval(this.timerId);
    console.log("  -> Timer telah dihentikan.");
  }

  // #4. attributeChangedCallback(name, oldValue, newValue)
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      console.log(
        `🔄 4. attributeChangedCallback: Atribut '${name}' berubah dari '${oldValue}' menjadi '${newValue}'.`
      );

      // Memperbarui nilai hitungan awal berdasarkan atribut
      if (name === "start-count") {
        this.currentCount = parseInt(newValue) || 0;
        this.querySelector("strong").textContent = this.currentCount;
      }
    }
  }

  // #5. adoptedCallback() - Jarang digunakan
  adoptedCallback(oldDocument, newDocument) {
    console.log("📄 5. adoptedCallback: Komponen dipindahkan ke dokumen baru.");
  }
}

// Mendaftarkan Custom Element ke browser
customElements.define("my-counter", MyCounter);
