import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios";
import { toast } from "sonner";
import { useRestaurantStore } from './useRestaurantStore';

const API_END_POINT = `http://localhost:8000/api/v1/menu`;
axios.defaults.withCredentials = true;

interface MenuState {
    loading: boolean;
    menu: any;
    isAuthenticated: boolean;
    createMenu: (formData: FormData) => Promise<void>;
    updateMenu: (menuId: string, formData: FormData) => Promise<void>;
    deleteMenu: (menuId: string) => Promise<void>;

}

export const useMenuStore = create<MenuState>()(
    persist((set) => ({
        loading: false,
        menu: null,
        isAuthenticated: false,

        createMenu: async (formData) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Menu created successfully!");
                    set({
                        loading: false,
                        menu: response.data.data,
                        isAuthenticated: true
                    });
                    // Update the restaurant to show menus
                    useRestaurantStore.getState().addMenuToRestaurant(response.data.data)
                }
            } catch (error: any) {
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "The menu creation failed!";
                toast.error(errorMessage);
                console.error("Restaurant creation Error:", error);
                throw error;
            }
        },

        updateMenu: async (menuId, formData: FormData) => {
            try {
                set({ loading: true });
                const response = await axios.patch(`${API_END_POINT}/update/${menuId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Menu updated successfully!");
                    set({
                        loading: false,
                        menu: response.data.data,
                        isAuthenticated: true
                    });
                    // Update the restaurant to show menus
                    useRestaurantStore.getState().addMenuToRestaurant(response.data.data)

                }
            } catch (error: any) {
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "Menu update failed!";
                toast.error(errorMessage);
                console.error("Menu update Error:", error);
                throw error;
            }
        },

        deleteMenu: async (menuId) => {
            try {
                set({ loading: true });
                const response = await axios.delete(`${API_END_POINT}/${menuId}`);

                if (response.data.success) {
                    toast.success(response.data.message || "Menu deleted successfully!");
                    set({
                        loading: false,
                        isAuthenticated: true
                    });
                }
                // Update the restaurant to show menus
                useRestaurantStore.getState().addMenuToRestaurant(response.data.data)

            } catch (error: any) {
                set({ loading: false });
                const errorMessage = error.response?.data?.message;
                toast.error(errorMessage);
                console.error("Menu delete Error:", error);
                throw error;
            }
        },

    }), {
        name: 'menu-storage',
        storage: createJSONStorage(() => localStorage),
    })
);
