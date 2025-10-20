const Model = {
  async fetchData() {
    const res = await fetch("/api/data");
    return res.json();
  },

  async addData(data) {
    const res = await fetch("/api/data", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-Type": "application/json" },
    });
    return res.json();
  },
};
