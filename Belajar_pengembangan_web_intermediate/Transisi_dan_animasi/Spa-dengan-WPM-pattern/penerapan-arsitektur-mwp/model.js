// Contoh untuk menampilkan data dari API. Fungsi yang ada di model bertugas untuk mendapatkan data dari API, di mana kode fetch berada di dalam fungsi ini.
export class RestaurantModel {
  async getRestaurants() {
    const response = await fetch("https://restaurant-api.dicoding.dev/list");

    if (!response.ok) {
      throw new Error("RESTAURANT_FAILED_TO_GET");
    }

    const { restaurants } = await response.json(); // ← "restaurants", bukan "restaurant"
    console.log(restaurants);
    return restaurants;
  }
}
