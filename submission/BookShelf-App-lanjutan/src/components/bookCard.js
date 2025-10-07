export function createBookElement(book, { onToggle, onEdit, onDelete }) {
  const parentElement = document.createElement("div");
  parentElement.classList.add("book-card");
  parentElement.setAttribute("data-bookid", book.id);
  parentElement.setAttribute("data-testid", "bookItem");

  const titleElement = document.createElement("h3");
  titleElement.setAttribute("data-testid", "bookItemTitle");
  titleElement.innerText = book.title;

  const authorElement = document.createElement("p");
  authorElement.setAttribute("data-testid", "bookItemAuthor");
  authorElement.innerText = "Penulis: " + book.author;

  const yearElement = document.createElement("p");
  yearElement.setAttribute("data-testid", "bookItemYear");
  yearElement.innerText = "Tahun: " + book.year;

  const actionElement = document.createElement("div");

  const buttonToggle = document.createElement("button");
  buttonToggle.setAttribute("data-testid", "bookItemIsCompleteButton");
  buttonToggle.innerText = book.isComplete
    ? "Belum selesai dibaca"
    : "Selesai dibaca";
  buttonToggle.addEventListener("click", () => onToggle(book.id));

  const buttonDelete = document.createElement("button");
  buttonDelete.setAttribute("data-testid", "bookItemDeleteButton");
  buttonDelete.innerText = "Hapus Buku";
  buttonDelete.addEventListener("click", () => onDelete(book.id));

  const buttonEdit = document.createElement("button");
  buttonEdit.setAttribute("data-testid", "bookItemEditButton");
  buttonEdit.innerText = "Edit Buku";
  buttonEdit.addEventListener("click", () => onEdit(book));

  actionElement.append(buttonToggle, buttonDelete, buttonEdit);
  parentElement.append(titleElement, authorElement, yearElement, actionElement);

  return parentElement;
}
