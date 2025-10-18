export class RestaurantsPagePresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async getRestaurants() {
    try {
      this.view.showLoading();
      const restaurants = await this.model.getRestaurants();
      this.view.renderRestaurants(restaurants);
    } catch {
      this.view.renderFailedMessage();
    }
  }
}
