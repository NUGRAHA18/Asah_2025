const xhr = new XMLHttpRequest();

xhr.onload = function () {
  console.log(this.responseText);
};

xhr.onerror = function () {
  console.log("Ups something error");
};

xhr.open("POST", "https://books-api.dicoding.dev/add");

// menambahkan properti pada header request
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("X-Auth-Token", "12345");

const book = {
  id: 10,
  title: "Edensor",
  author: "Andrea Hirata",
};

xhr.send(JSON.stringify(book));
