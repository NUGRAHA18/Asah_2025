class NotesAPI {
  static BASE_URL = "https://notes-api.dicoding.dev/v2";

  static async getNotes() {
    // Mengambil catatan yang tidak diarsipkan
    const response = await fetch(`${this.BASE_URL}/notes`);
    const responseJson = await response.json();

    // Cek jika status respons bukan 'success'
    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  }

  static async addNote(note) {
    const response = await fetch(`${this.BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }

    return responseJson.data;
  }

  static async deleteNote(id) {
    const response = await fetch(`${this.BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
  }
  // Mengambil catatan terarsip
  static async getArchivedNotes() {
    const response = await fetch(`${this.BASE_URL}/notes/archived`);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  //Mengarsipkan Catatan
  static async archiveNote(id) {
    const response = await fetch(`${this.BASE_URL}/notes/${id}/archive`, {
      method: "POST",
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
  }

  //Membatalkan Arsip
  static async unarchiveNote(id) {
    const response = await fetch(`${this.BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
  }
}

export default NotesAPI;
