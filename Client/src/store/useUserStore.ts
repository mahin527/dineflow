import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = `http://localhost:8000/api/v1/user`;
axios.defaults.withCredentials = true;

interface UserState {
    user: any;
    isAuthenticated: boolean;
    loading: boolean;
    signup: (input: any) => Promise<void>;

}

export const useUserStore = create<UserState>()(
    persist((set) => ({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: true,
        loading: false,

        signup: async (input: any) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/signup`, input, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Signup successful!");
                    set({
                        loading: false,
                        user: response.data.user,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                const errorMessage = error.response?.data?.message || "Signup failed!";
                toast.error(errorMessage);
                set({ loading: false });
                console.error("Signup Error:", error);
            }
        }
    }), {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
    })
);