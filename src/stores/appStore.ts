import { create } from "zustand";
import { IFormData } from "../models/IFormData";

interface AppStore {
  filters: IFormData;
  setFilters: (filters: IFormData) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  filters: {
    text_field_1: "",
    text_field_2: "",
    search: "",
  },
  setFilters: (filters) => set(() => ({ filters })),
  currentPage: 1,
  setCurrentPage: (page) => set(() => ({ currentPage: page })),
  rowsPerPage: 10,
  setRowsPerPage: (rows) => set(() => ({ rowsPerPage: rows })),
}));
