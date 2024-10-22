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

interface StoreState {
  array: Episode[];
  setEpisodesData: (episodesData: Episode[]) => void;
  addEpisode: (item: Episode) => void;
  editEpisode: (id: number, newItem: Episode) => void;
  deleteEpisode: (deletionId: number) => void;
}

const EpisodesStore = create<StoreState>()(
  persist(
    (set) => ({
      array: [],
      setEpisodesData: (episodesData) => set({ array: episodesData }),
      addEpisode: (item) => set((state) => ({ array: [...state.array, item] })),
      editEpisode: (id, newItem) => {
        console.log(id, newItem, "test8");

        set((state) => ({
          array: state.array.map((item) => (item.id === id ? {...item, ...newItem} : item)),
        }));
      },
      deleteEpisode: (deletionId) =>
        set((state) => ({
          array: state.array.filter((episode) => {
            return episode.id !== deletionId;
          }),
        })),
    }),
    { name: "my-app-storage" }
  )
);

export default EpisodesStore;
