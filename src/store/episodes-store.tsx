import { create } from "zustand";
import { persist } from "zustand/middleware";

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

interface StoreState {
  array: Episode[];
  setEpisodesData: (episodesData: Episode[]) => void;
  addEpisode: (item: Episode) => void;
  editEpisode: (id: number, newItem: Episode) => void;
  deleteEpisode: (deletionId: number) => void;

  Array: Character[];
  setCharacterArray: (CharactersData: Character[]) => void;
  addCharacter: (item: Character) => void;
  editCharacter: (id: number, newItem: Character) => void;
  deleteCharacter: (deletionId: number) => void;
}

const EpisodesStore = create<StoreState>()(
  persist(
    (set) => ({
      array: [],
      setEpisodesData: (episodesData) => set({ array: episodesData }),
      addEpisode: (item) => set((state) => ({ array: [...state.array, item] })),
      editEpisode: (id, newItem) =>
        set((state) => ({
          array: state.array.map((item) =>
            item.id === id ? { ...item, ...newItem } : item
          ),
        })),
      deleteEpisode: (deletionId) =>
        set((state) => ({
          array: state.array.filter((episode) => {
            return episode.id !== deletionId;
          }),
        })),

      Array: [],
      setCharacterArray: (CharactersData) => set({ Array: CharactersData }),
      addCharacter: (item) =>
        set((state) => ({ Array: [...state.Array, item] })),
      editCharacter: (id, newItem) =>
        set((state) => ({
          Array: state.Array.map((item) =>
            item.id === id ? { ...item, ...newItem } : item
          ),
        })),
      deleteCharacter: (deletionId) =>
        set((state) => ({
          Array: state.Array.filter((character) => {
            return character.id !== deletionId;
          }),
        })),
    }),
    { name: "my-app-storage" }
  )
);

export default EpisodesStore;
