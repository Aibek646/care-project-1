import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "@/types/item";

export type Document = {
  id: string;
  title: string;
  createdAt: string;
  items: Item[];
  status: "draft" | "sent";
};

type ReceivingStore = {
  documents: Document[];
  createDocument: (title: string) => string;
  deleteDocument: (id: string) => void;
  renameDocument: (id: string, title: string) => void;
  setItems: (docId: string, fn: (prev: Item[]) => Item[]) => void;
  markSent: (id: string) => void;
};

export const useReceivingStore = create<ReceivingStore>()(
  persist(
    (set) => ({
      documents: [],

      createDocument: (title) => {
        const id = Date.now().toString();
        const doc: Document = {
          id,
          title,
          createdAt: new Date().toISOString(),
          items: [],
          status: "draft",
        };
        set((state) => ({ documents: [doc, ...state.documents] }));
        return id;
      },

      deleteDocument: (id) =>
        set((state) => ({
          documents: state.documents.filter((d) => d.id !== id),
        })),

      renameDocument: (id, title) =>
        set((state) => ({
          documents: state.documents.map((d) =>
            d.id === id ? { ...d, title } : d,
          ),
        })),

      markSent: (id) =>
        set((state) => ({
          documents: state.documents.map((d) =>
            d.id === id ? { ...d, status: "sent" as const } : d,
          ),
        })),

      setItems: (docId, fn) =>
        set((state) => ({
          documents: state.documents.map((d) =>
            d.id === docId ? { ...d, items: fn(d.items) } : d,
          ),
        })),
    }),
    {
      name: "receiving-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
