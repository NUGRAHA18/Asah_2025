class View {
  showData(data) {
    document.getElementById("list").innerHTML = data
      .map((item) => `<li>${item}</li>`)
      .join("");
  }

  onAddButtonClick(callback) {
    document.getElementById("btnAdd").addEventListener("click", () => {
      const input = document.getElementById("input").value;
      callback(input); // kirim ke Presenter
    });
  }
}
