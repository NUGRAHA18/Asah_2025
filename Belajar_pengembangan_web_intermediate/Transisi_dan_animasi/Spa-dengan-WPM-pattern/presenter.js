class Presenter {
  #model;
  #view;

  constructor({ model, view }) {
    this.#model = model;
    this.#view = view;
  }

  async getData() {
    const data = await this.#model.fetchData();
    this.#view.showData(data);
  }

  async onSubmit(inputData) {
    const updatedData = await this.#model.postData({ item: inputData });
    this.#view.showData(updatedData);
  }
}
