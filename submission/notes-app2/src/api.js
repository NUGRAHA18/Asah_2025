class NotesAPI {
  static BASE_URL = "https://notes-api.dicoding.dev/v2";

  static async getNotes() {
    // Mengambil catatan yang tidak diarsipkan
    const response = await fetch(`${this.BASE_URL}/notes`);
    const responseJson = await response.json();

    // Cek jika status respons bukan 'success'
    if (responseJson.status !== "success") {
      // Lemparkan error dengan pesan dari API
      throw new Error(responseJson.message);
    }

    // Kembalikan data catatan jika berhasil
    return responseJson.data;
  }

  // Kita akan menambahkan fungsi lain (add, delete) di sini nanti
}

export default NotesAPI;
