import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios";
import { toast } from "sonner";
import { type RestaurantState } from "@/types/restaurant.types"

/* TODO: https://chatgpt.com/c/69cb3d61-3bc4-8323-9c06-f91a0ca60a70
headers: { "Content-Type": "multipart/form-data" }

👉 বারবার লিখছো
axios instance বানাও

const api = axios.create({
    baseURL: API_END_POINT,
    withCredentials: true
});

🟡 ISSUE 7 — error handling duplicated everywhere

same code copy-paste:

const errorMessage = error.response?.data?.message
✅ FIX:

helper function বানাও:

const handleError = (error: any, defaultMsg: string) => {
    return error.response?.data?.message || defaultMsg;
};

ISSUE 8 — isAuthenticated misuse
isAuthenticated: true

👉 restaurant fetch = auth success? 😐

👉 এটা auth store এর কাজ, restaurant store না

ISSUE 9 — persist overkill
persist(...)

👉 তুমি পুরো restaurant localStorage এ রাখছো

💥 problem:

stale data
security risk
✅ Better:

persist only needed fields or remove
*/

const API_END_POINT = `http://localhost:8000/api/v1/restaurant`;
axios.defaults.withCredentials = true;


export const useRestaurantStore = create<RestaurantState>()(
    persist((set) => ({
        loading: false,
        restaurant: null,
        isAuthenticated: false,
        appliedFilter: [],
        searchedRestaurant: null,
        singleRestaurant: null,

        createRestaurant: async (formData) => {
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
                    // toast.success(response.data.message || "Restaurant fetched successfully!");
                    set({
                        loading: false,
                        restaurant: response.data.data,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "Restaurant fetch failed!";
                toast.error(errorMessage);
                console.error("Restaurant fetch Error:", error);
                throw error;
            }
        },

        getSingleRestaurant: async (restaurantId) => {
            try {
                const response = await axios.get(`${API_END_POINT}/${restaurantId}`);

                if (response.data.success) {
                    set({
                        singleRestaurant: response.data.data,
                    });
                    // console.log(response.data.data);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || "Restaurant fetch failed!";
                toast.error(errorMessage);
                console.error("Restaurant fetch Error:", error);
                throw error;
            }
        },


        updateRestaurant: async (formData) => {
            try {
                set({ loading: true });
                const response = await axios.patch(`${API_END_POINT}/update`, formData);

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
                const params = new URLSearchParams()
                params.set("searchQuery", searchQuery)
                params.set("selectedCuisines", selectedCuisines.join(","))
                const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);

                // await new Promise((resolve) => setTimeout(resolve, 1000));

                if (response.data.success) {
                    set({
                        loading: false,
                        searchedRestaurant: response.data
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

        addMenuToRestaurant: async (menu) => {
            try {
                set((state) => ({
                    restaurant: state.restaurant
                        ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
                        : null
                }));
                const response = await axios.get(`${API_END_POINT}/`);

                if (response.data.success) {
                    // toast.success(response.data.message || "Restaurant fetched successfully!");
                    set({
                        restaurant: response.data.data,
                        isAuthenticated: true
                    });
                }
                // TODO: Option B (refetch only):
                // await getRestaurant();
            } catch (error: any) {
                // error handling
                const errorMessage = error.response?.data?.message || "Restaurant fetch failed!";
                toast.error(errorMessage);
                console.error("Restaurant fetch Error:", error);
                throw error;
            }
        },

        setAppliedFilter: async (value) => {
            set((state) => {
                const isAlreadyApplied = state.appliedFilter.includes(value);
                const updatedFilter = isAlreadyApplied ? state.appliedFilter
                    .filter((item) => item !== value) : [...state.appliedFilter, value]
                return { appliedFilter: updatedFilter }
            })
        },

        resetAppliedFilter: () => {
            set({ appliedFilter: [] })
        }
    }), {
        name: 'restaurant-storage',
        storage: createJSONStorage(() => localStorage),
    })
);

