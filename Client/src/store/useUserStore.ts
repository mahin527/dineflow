import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios"

const API_END_POINT = `http://localhost:8000/api/v1/user`
axios.defaults.withCredentials = true

export const useUserStore = create()(
    persist((set) => ({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: true,
        loading: false,
        // signup api implementation
        signup: async (input) => {
            try {
                set({ loading: true })
                const response = await axios.post(`${API_END_POINT}/signup`, input, {
                    headers: {
                        "Content-type": "application/json"
                    }
                })

                if (response.data.success) {
                    console.log(response.data);
                    toast.success(response.data.message)
                    set({ loading: false, user: response.data.user, isAuthenticated: true })
                }
            } catch (error) {
                set({ loading: false })
                console.log(error);

            }
        }
    }), {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
    })
)