import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  array: string[];
  setCharacterArray: (CharactersData: string[]) => void;
  addCharacter: (item: string) => void;
  editCharacter: (index: number, newItem: string) => void;
  deleteCharacter: (index: number) => void;
}

const CharactersStore = create<StoreState>()(
  persist(
    (set) => ({
      array: [],
      setCharacterArray: (CharactersData) => set({ array: CharactersData }),
      addCharacter: (item) =>
        set((state) => ({ array: [...state.array, item] })),
      editCharacter: (index, newItem) =>
        set((state) => ({
          array: state.array.map((item, i) => (i === index ? newItem : item)),
        })),
      deleteCharacter: (index) =>
        set((state) => ({
          array: state.array.filter((_, i) => i !== index),
        })),
    }),
    { name: "my-app-storage" }
  )
);

export default CharactersStore;
