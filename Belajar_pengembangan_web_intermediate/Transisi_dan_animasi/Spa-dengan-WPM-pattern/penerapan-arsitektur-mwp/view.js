import { RestaurantsModel } from "./model.js";
import { RestaurantsPagePresenter } from "./presenter.js";

export class RestaurantsPageView {
  render() {
    // ... melakukan rendering awal
  }

  async afterRender() {
    // ... membuat model dan presenter
    const model = new RestaurantsModel();
    const presenter = new RestaurantsPagePresenter(model, this);

    // ... memanggil `getRestaurants()` dari presenter.
    await presenter.getRestaurants();
  }

  renderRestaurants(restaurants) {
    const container = document.getElementById("container");
    const restaurantNamesAsParagraph = restaurants.map((restaurant) => {
      const pElement = document.createElement("p");
      pElement.innerText = restaurant.name;
      return pElement;
    });

    // rendering restaurants
    container.innerHTML = ""; // clearing container
    restaurantNamesAsParagraph.forEach((pElement) => {
      container.appendChild(pElement);
    });
  }

  renderFailedMessage() {
    const container = document.getElementById("container");
    container.innerHTML = ""; // clearing container
    container.innerText = "Gagal mendapatkan data restaurant";
  }

  showLoading() {
    const container = document.getElementById("container");
    container.innerText = "Loading to get restaurant ...";
  }
}
