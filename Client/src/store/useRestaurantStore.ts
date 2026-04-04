import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = `http://localhost:8000/api/v1/restaurant`;
axios.defaults.withCredentials = true;


interface RestaurantState {
    loading: boolean;
    restaurant: any;
    isAuthenticated: boolean;
    createRestaurant: (data: any) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (data: any) => Promise<void>;
    searchRestaurants: (searchText: string, searchQuery: string, searchCuisines: any) => Promise<void>;

}

export const useRestaurantStore = create<RestaurantState>()(
    persist((set) => ({
        loading: false,
        restaurant: null,
        isAuthenticated: false,

        createRestaurant: async (formData: FormData) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Restaurant created successfully!");
                    set({
                        loading: false,
                        restaurant: response.data.data,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "The restaurant creation failed!";
                toast.error(errorMessage);
                console.error("Restaurant creation Error:", error);
                throw error;
            }
        },

        getRestaurant: async () => {
            try {
                set({ loading: true });
                const response = await axios.get(`${API_END_POINT}/`);

                if (response.data.success) {
                    toast.success(response.data.message || "Restaurant fetched successfully!");
                    set({
                        loading: false,
                        restaurant: response.data.data,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "Restaurant fetch failed!";
                toast.error(errorMessage);
                console.error("Restaurant fetch Error:", error);
                throw error;
            }
        },

        updateRestaurant: async (formData: FormData) => {
            try {
                set({ loading: true });
                const response = await axios.patch(`${API_END_POINT}/update`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Restaurant updated successfully!");
                    set({
                        loading: false,
                        restaurant: response.data.data,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "Restaurant update failed!";
                toast.error(errorMessage);
                console.error("Restaurant update Error:", error);
                throw error;
            }
        },

        searchRestaurants: async (searchText, searchQuery, selectedCuisines) => {
            try {
                set({ loading: true });
                // const response = await axios.get(`${API_END_POINT}/search/${searchText}?searchQuery=${searchQuery}&cuisines=${selectedCuisines}`);
                const params = new URLSearchParams()
                params.set("searchQuery", searchQuery)
                params.set("selectedCuisines", selectedCuisines)
                const response = await axios.get(`${API_END_POINT}/search/${searchText}?searchQuery=${searchQuery}?${params.toString()}`);

                if (response.data.success) {
                    toast.success(response.data.message || "restaurants found successfully!");
                    set({
                        loading: false,
                        restaurant: response.data.data,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "Restaurant not found!";
                toast.error(errorMessage);
                console.error("Restaurant fetch Error:", error);
                throw error;
            }
        },

    }), {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
    })
);

