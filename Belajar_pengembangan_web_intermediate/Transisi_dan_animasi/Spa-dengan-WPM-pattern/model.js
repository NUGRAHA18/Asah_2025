const Model = {
  async fetchData() {
    const fetchResponse = await fetch("/api/data");
    const jsonResponse = await fetchResponse.json();

    return jsonResponse;
  },

  async postData(data) {
    const fetchResponse = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const jsonResponse = await fetchResponse.json();

    return jsonResponse;
  },

  async deleteData(id) {
    const fetchResponse = await fetch("/api/data", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const jsonResponse = await fetchResponse.json();

    return jsonResponse;
  },
};
