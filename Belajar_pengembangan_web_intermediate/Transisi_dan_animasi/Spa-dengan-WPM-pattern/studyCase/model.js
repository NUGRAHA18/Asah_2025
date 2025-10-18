export class RestaurantModel {
  async getRestaurants() {
    const response = await fetch("https://restaurant-api.dicoding.dev/list");

    if (!response.ok) {
      throw new Error("RESTAURANT_FAILED_TO_GET");
    }

    const { restaurants } = await response.json();

    return restaurants;
  }
}
