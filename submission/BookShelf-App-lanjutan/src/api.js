const BASE = "https://notes-api.dicoding.dev/v2";

async function safeJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

async function handleRes(res) {
  const body = await safeJson(res);
  if (!res.ok) {
    const message = body?.message || res.statusText || "Unknown error";
    throw new Error(message);
  }
  return body;
}

export async function getNotes() {
  const res = await fetch(`${BASE}/notes`);
  const body = await handleRes(res);
  return body.data?.notes ?? body.notes ?? body.data ?? [];
}

export async function createNote(payload) {
  const res = await fetch(`${BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await handleRes(res);
  return body.data?.note ?? body.data ?? body;
}

export async function getNoteById(id) {
  const res = await fetch(`${BASE}/notes/${id}`);
  const body = await handleRes(res);
  return body.data?.note ?? body.data ?? body;
}

export async function updateNote(id, payload) {
  const res = await fetch(`${BASE}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await handleRes(res);
  return body.data?.note ?? body.data ?? body;
}

export async function deleteNote(id) {
  const res = await fetch(`${BASE}/notes/${id}`, { method: "DELETE" });
  return handleRes(res);
}

export async function archiveNote(id) {
  const res = await fetch(`${BASE}/notes/${id}/archive`, { method: "POST" });
  return handleRes(res);
}

export async function unarchiveNote(id) {
  const res = await fetch(`${BASE}/notes/${id}/unarchive`, { method: "POST" });
  return handleRes(res);
}
