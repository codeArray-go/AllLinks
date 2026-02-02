import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,

    checkAuth: async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getData/me`, {
                credentials: 'include',
            });
            if (res.ok) {
                const data = await res.json();
                set({ isAuthenticated: true, user: data.user.username });
            } else {
                set({ isAuthenticated: false, user: null });
            }
        } catch (error) {
            console.error("Auth check failed", error);
            set({ isAuthenticated: false, user: null });
        }
    },

    login: (userData) => set({ isAuthenticated: true, user: userData }),

    logout: async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            set({ isAuthenticated: false, user: null });
        }
    },

    edit: false
}));

export default useAuthStore;
