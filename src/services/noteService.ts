// src/services/noteService.ts
import axios, { AxiosInstance } from "axios";
import { Note, NoteTag } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;

if (!TOKEN) {
  alert("NO TOKEN!!!");
}

const api: AxiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
    "Content-Type": "application/json",
  },
});

interface FetchNotesResponse {
  data: Note[];
  total: number;
  page: number;
  perPage: number;
}

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag?: NoteTag;
}

interface DeleteNoteResponse {
  data: Note;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search && search.trim() !== "") {
    params.search = search.trim();
  }

  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data } = await api.post<{ data: Note }>("/notes", note);
  return data.data;
};

export const deleteNote = async (id: string | number): Promise<Note> => {
  const { data } = await api.delete<DeleteNoteResponse>(`/notes/${id}`);
  return data.data;
};
