import axios, { AxiosInstance } from "axios";
import { Note, NoteTag } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;

const api: AxiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
    "Content-Type": "application/json",
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
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
  if (search && search.trim() !== "") params.search = search.trim();

  const response = await api.get("/notes", { params });
  return response.data;
};

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data } = await api.post<{ data: Note }>("/notes", note);
  return data.data;
};

export const deleteNote = async (id: string | number): Promise<Note> => {
  const { data } = await api.delete<DeleteNoteResponse>(`/notes/${id}`);
  return data.data;
};
