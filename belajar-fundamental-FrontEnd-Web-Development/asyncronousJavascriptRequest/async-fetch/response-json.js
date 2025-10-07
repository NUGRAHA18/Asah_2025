/* akan menerima respons object apapun seperti : tatus code, target url, headers
yang perlu di parse menggunakan method json() */

fetch("https://books-api.dicoding.dev/list").then((response) => {
  return response.json();
});
