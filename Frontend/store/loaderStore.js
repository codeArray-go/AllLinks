import { create } from "zustand";

const  UseLoader = create((set) => ({
    loading: false,
    showLoader: () => set({loading: true}),
    hideLoader: () => set({loading: false}),
}))

export default UseLoader;