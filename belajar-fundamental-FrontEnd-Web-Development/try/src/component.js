class pengantar extends HTMLElement {
  constructor() {
    super();
    this._pengantar_img = this.getAttribute("src-img");
    this._altIMG = this.getAttribute("alt-img");
    this._figcaption = this.getAttribute("figcaption");
    this.innerHTML = `
    <section>
          <h3>Pengantar</h3>
          <img src="${this._pengantar_img}" alt="${this._altIMG}" />
          <figcaption>${this._figcaption}</figcaption>
          
          <p>
            Setiap halaman web yang Anda lihat adalah sebuah dokumen. **DOM**
            adalah representasi terstruktur (pohon) dari dokumen ini, yang
            memungkinkan bahasa skrip seperti JavaScript untuk mengakses dan
            memodifikasi konten, struktur, dan gaya dokumen. Ini adalah jembatan
            antara halaman web statis dan pengalaman web dinamis yang kita kenal
            saat ini.
          </p>
          <p>
            Dari catatan Anda sebelumnya, Anda sudah mencapai bagian *event
            handling* dan memiliki yang tersimpan, yang
            menunjukkan fokus Anda pada manipulasi DOM. Proyek ini adalah wadah
            yang sempurna untuk mempraktikkan hal tersebut!
          </p>
        </section>`;
  }
}

customElements.define("pengantar-section", pengantar);

class struktur_dasar_dom extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
        <section>
          <h3>Struktur Dasar DOMMM</h3>
          <p>
            DOM memodelkan dokumen sebagai pohon objek logis. Akar dari pohon
            ini adalah objek **document**. Setiap elemen HTML (seperti
        &lt;div&gt;, &lt;p&gt;, &lt;h1&gt;) dan bahkan teks di
            dalamnya, diwakili sebagai sebuah **Node**.
          </p>
          <ul>
            <li>**Elemen Node:** Merepresentasikan tag HTML.</li>
            <li>**Teks Node:** Merepresentasikan teks di dalam elemen.</li>
            <li>
              **Atribut Node:** Merepresentasikan atribut elemen (misalnya
              href pada &lt;a&gt;).
            </li>
          </ul>
        </section>`;
  }
}

customElements.define("struktur-dasar-dom", struktur_dasar_dom);

class manfaat_dom extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <section>
          <h3>Manfaat & Penerapan</h3>
          <p>
            Tanpa DOM, sebuah website akan menjadi halaman statis yang kaku.
            Melalui DOM, kita dapat:
          </p>
          <ol>
            <li>
              Mengubah teks dalam paragraf (misalnya, memperbarui skor secara
              real-time).
            </li>
            <li>
              Menyembunyikan atau menampilkan elemen (misalnya, menu
              *dropdown*).
            </li>
            <li>
              Menanggapi interaksi pengguna (seperti **event handling** yang
              sedang Anda pelajari).
            </li>
          </ol>
        </section>`;
  }
}

customElements.define("manfaat-dom", manfaat_dom);
