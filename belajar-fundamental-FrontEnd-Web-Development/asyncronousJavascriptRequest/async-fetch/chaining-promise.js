/*Method json() juga mengembalikan nilai Promise sehingga kita membutuhkan chaining promise dengan menambahkan then() untuk mendapatkan data JSON yang sesungguhnya.*/
fetch("https://books-api.dicoding.dev/list")
  .then((response) => {
    return response.json();
  })
  .then((responseJson) => {
    console.log(responseJson);
  })
  .catch((error) => {
    console.log(error);
  });

//Karena Fetch memanfaatkan Promise, kita bisa memanfaatkan async/await untuk menangani proses asynchronous dengan rasa synchronous.
async function getBooks() {
  try {
    const response = await fetch("https://books-api.dicoding.dev/list");
    const responseJson = await response.json();

    console.log(responseJson);
  } catch (error) {
    console.log(error);
  }
}

getBooks();
