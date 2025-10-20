class Presenter {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;

    this.view.onAddButtonClick(this.handleAdd.bind(this));
    this.loadData();
  }

  async loadData() {
    const data = await this.model.fetchData();
    this.view.showData(data);
  }

  async handleAdd(inputValue) {
    await this.model.addData({ text: inputValue });
    this.loadData(); // refresh data
  }
}
