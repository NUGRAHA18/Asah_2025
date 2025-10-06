import "./styles/style.css";
import * as api from "./api.js";
import { noteToBook, bookToNotePayload } from "./utils.js";
import { createLoading } from "./components/loading.js";
import { createBookElement } from "./components/bookCard.js";
let books = [];
let editingBookId = null;

const incompleteList = document.getElementById("incompleteBookList");
const completeList = document.getElementById("completeBookList");
const submitForm = document.getElementById("bookForm");
const submitBtn = document.getElementById("bookFormSubmit");
const cancelBtn = document.getElementById("bookFormCancel");
const updateBtn = document.getElementById("updateBookButton");
const searchForm = document.getElementById("searchBook");
const searchInput = document.getElementById("searchBookTitle");

// append loading indicator to body
const loadingEl = createLoading();
document.body.appendChild(loadingEl);
function showLoading(on = true) {
  loadingEl.style.display = on ? "block" : "none";
}

function resetFormState() {
  submitBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
}

function loadBookToForm(book) {
  document.getElementById("bookId").value = book.id;
  document.getElementById("bookFormTitle").value = book.title;
  document.getElementById("bookFormAuthor").value = book.author;
  document.getElementById("bookFormYear").value = book.year;
  document.getElementById("bookFormIsComplete").checked = book.isComplete;
}

function render() {
  incompleteList.innerHTML = "";
  completeList.innerHTML = "";

  for (const bookItem of books) {
    const el = createBookElement(bookItem, {
      onToggle: toggleBookComplete,
      onEdit: (b) => {
        editingBookId = b.id;
        loadBookToForm(b);
        submitBtn.style.display = "none";
        updateBtn.style.display = "inline-block";
        cancelBtn.style.display = "inline-block";
      },
      onDelete: deleteBook,
    });

    if (!bookItem.isComplete) incompleteList.append(el);
    else completeList.append(el);
  }
}

async function loadBooksFromServer() {
  showLoading(true);
  try {
    const notes = await api.getNotes();
    books = (Array.isArray(notes) ? notes : []).map(noteToBook);
    render();
  } catch (e) {
    console.error(e);
    alert("Gagal memuat data: " + e.message);
  } finally {
    showLoading(false);
  }
}

async function addBook() {
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const book = { id: null, title, author, year, isComplete };
  showLoading(true);
  try {
    const created = await api.createNote(bookToNotePayload(book));
    books.push(noteToBook(created));
    render();
  } catch (e) {
    console.error(e);
    alert("Gagal menambahkan: " + e.message);
  } finally {
    showLoading(false);
  }
}

async function updateBook() {
  const id = editingBookId || document.getElementById("bookId").value;
  if (!id) return alert("ID buku tidak ditemukan");

  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const updated = { id, title, author, year, isComplete };
  showLoading(true);
  try {
    const note = await api.updateNote(id, bookToNotePayload(updated));
    books = books.map((b) => (b.id === id ? noteToBook(note) : b));
    render();
    submitForm.reset();
    editingBookId = null;
    resetFormState();
  } catch (e) {
    console.error(e);
    alert("Gagal update: " + e.message);
  } finally {
    showLoading(false);
  }
}

async function deleteBook(id) {
  if (!confirm("Yakin ingin menghapus buku ini?")) return;
  showLoading(true);
  try {
    await api.deleteNote(id);
    books = books.filter((b) => b.id !== id);
    render();
  } catch (e) {
    console.error(e);
    alert("Gagal hapus: " + e.message);
  } finally {
    showLoading(false);
  }
}

async function toggleBookComplete(id) {
  const b = books.find((x) => x.id === id);
  if (!b) return;
  const updated = { ...b, isComplete: !b.isComplete };
  showLoading(true);
  try {
    const note = await api.updateNote(id, bookToNotePayload(updated));
    books = books.map((x) => (x.id === id ? noteToBook(note) : x));
    render();
  } catch (e) {
    console.error(e);
    alert("Gagal mengubah status: " + e.message);
  } finally {
    showLoading(false);
  }
}

// Search handler (form submit or input)
searchForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const q = searchInput.value.trim().toLowerCase();
  const items = document.querySelectorAll("[data-testid='bookItem']");
  let found = 0;
  for (const item of items) {
    const title = item.querySelector("h3").innerText.toLowerCase();
    const author = item.querySelector("p").innerText.toLowerCase();
    if (title.includes(q) || author.includes(q)) {
      item.style.display = "block";
      found++;
    } else {
      item.style.display = "none";
    }
  }
  if (q !== "") {
    alert(found > 0 ? `${found} buku ditemukan` : "Tidak ada buku yang cocok");
  }
});

submitForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  if (editingBookId) {
    updateBook();
  } else {
    addBook();
  }
  submitForm.reset();
});

cancelBtn.addEventListener("click", () => {
  submitForm.reset();
  editingBookId = null;
  resetFormState();
});

updateBtn.addEventListener("click", () => updateBook());

// initial load
loadBooksFromServer();
