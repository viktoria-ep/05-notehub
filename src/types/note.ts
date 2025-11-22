// src/types/note.ts
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string; // чаще всего id — строка (uuid). Если у вас number — поменяйте на number.
  title: string;
  content?: string;
  tag?: NoteTag;
  createdAt?: string;
  updatedAt?: string;
}
