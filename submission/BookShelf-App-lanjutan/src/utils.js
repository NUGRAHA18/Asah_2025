export function noteToBook(note) {
  let parsed = {};
  if (typeof note.body === "string") {
    try {
      parsed = JSON.parse(note.body);
    } catch (e) {
      parsed = { rawBody: note.body };
    }
  } else if (typeof note.body === "object" && note.body !== null) {
    parsed = note.body;
  }

  return {
    id: note.id ?? note._id ?? note.id_note,
    title: note.title ?? parsed.title ?? "Untitled",
    author: parsed.author ?? "",
    year: parsed.year ?? "",
    isComplete: Boolean(parsed.isComplete),
  };
}

export function bookToNotePayload(book) {
  return {
    title: book.title,
    body: JSON.stringify({
      author: book.author,
      year: book.year,
      isComplete: !!book.isComplete,
    }),
    createdAt: new Date().toISOString(),
  };
}
