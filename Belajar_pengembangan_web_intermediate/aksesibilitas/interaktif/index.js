const button = document.querySelector("button");
const divButton = document.querySelector("div.button");
const output = document.querySelector("#output");

const instructions = `
  Coba tekan tombol menggunakan cursor dan menggunakan keyboard
  (gunakan tombol Tab dan Space/Enter untuk melakukan aksi klik).
`;

function clickHandler(event) {
  const elementType = event.currentTarget.tagName.toLowerCase();
  output.textContent = `Kamu berhasil memicu <${elementType}> dengan klik!`;

  setTimeout(() => {
    output.textContent = instructions;
  }, 1000);
}

function keyUpHandler(event) {
  if (event.code === "Enter" || event.code === "Space") {
    output.textContent = `Kamu berhasil memicu <div> menggunakan tombol ${event.code}!`;

    setTimeout(() => {
      output.textContent = instructions;
    }, 1000);
  }
}

button.onclick = clickHandler;
divButton.onclick = clickHandler;
divButton.onkeyup = keyUpHandler;
