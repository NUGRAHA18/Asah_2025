fetch("https://books-api.dicoding.dev/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", //menetapkan header properti
    "X-Auth-Token": "12345",
  },
  body: JSON.stringify({
    //mentapkan data pada body request
    id: 10,
    title: "Edensor",
    author: "Andrea Hirata",
  }),
});
