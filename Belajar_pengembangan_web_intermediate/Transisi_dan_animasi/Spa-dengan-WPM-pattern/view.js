import Model from "./model.js";

class View {
  #presenter;

  async render() {
    return `
      <input type="text" id="inputField">
      <button id="submitButton">Submit</button>
      <ul id="output"></ul>
    `;
  }

  async afterRender() {
    // Do something...

    this.#presenter = new Presenter({
      model: Model,
      view: this,
    });

    await this.#presenter.getData();

    this.#addSubmitListener();
  }

  showData(data) {
    const output = document.getElementById("output");
    output.innerHTML = data.map((item) => `<li>${item}</li>`).join("");
  }

  #addSubmitListener(callback) {
    const submitButton = document.getElementById("output");
    submitButton.addEventListener("click", () => {
      const inputData = document.getElementById("inputField").value;
      this.#presenter.onSubmit(inputData);
    });
  }
}
