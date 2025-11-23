import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";
import { fetchNotes, FetchNotesResponse } from "../../services/noteService";

export default function App(): React.ReactElement {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(12);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isError, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page, perPage, debouncedSearch),
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            total={totalPages}
            onChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main className={css.container}>
        {isError && <div>Something went wrong.</div>}

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          notes.length > 0 && <NoteList notes={notes} />
        )}
      </main>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
