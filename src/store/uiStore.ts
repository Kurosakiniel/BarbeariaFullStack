// src/store/uiStore.ts
import { create } from "zustand";

type UIStore = {
  modalAberto: boolean;
  abrirModal: () => void;
  fecharModal: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  modalAberto: false,
  abrirModal: () => set({ modalAberto: true }),
  fecharModal: () => set({ modalAberto: false }),
}));