//menetapkan properti Content-Type dengan nilai application/json pada request,
const xhr = new XMLHttpRequest();

xhr.onload = function () {
  console.log(this.responseText);
};

xhr.onerror = function () {
  console.log("Ups something wrong");
};

xhr.open("POST", "https://books-api.dicoding.dev/add");

// menambahkan properti pada header request
xhr.setRequestHeader("Content-Type", "application/json"); //ini property di header
xhr.setRequestHeader("X-Auth-Token", "12345"); //bisa menetapkan propery sebanyak yang diperlukan
