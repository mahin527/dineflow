import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios";
import { toast } from "sonner";
import { type RestaurantState } from "@/types/restaurant.types"

/* TODO: https://chatgpt.com/c/69cb3d61-3bc4-8323-9c06-f91a0ca60a70
headers: { "Content-Type": "multipart/form-data" }

👉 You write again and again
make => axios instance 

const api = axios.create({
    baseURL: API_END_POINT,
    withCredentials: true
});

🟡 ISSUE 7 — error handling duplicated everywhere

same code copy-paste:

const errorMessage = error.response?.data?.message
✅ FIX:

make => helper function:

const handleError = (error: any, defaultMsg: string) => {
    return error.response?.data?.message || defaultMsg;
};

ISSUE 8 — isAuthenticated misuse
isAuthenticated: true

👉 restaurant fetch = auth success? 😐

👉 It is the work of the auth store, not the restaurant store

ISSUE 9 — persist overkill
persist(...)

👉 You put it in the entire restaurant localStorage

💥 problem:

stale data
security risk
✅ Better:

persist only needed fields or remove
*/

const API_END_POINT = `https://dineflow-server.onrender.com/api/v1/restaurant`;
axios.defaults.withCredentials = true;


export const useRestaurantStore = create<RestaurantState>()(
    persist((set, get) => ({
        loading: false,
        restaurant: null,
        isAuthenticated: false,
        appliedFilter: [],
        searchedRestaurant: null,
        singleRestaurant: null,
        restaurantOrders: [],
        allRestaurants: [],
        
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
        },

        getRestaurantOrders: async () => {
            try {
                const response = await axios.get(`${API_END_POINT}/orders`);

                if (response.data.success) {
                    set({
                        restaurantOrders: response.data.data,
                    });
                }
            } catch (error) {
                throw error;
            }
        },

        updateOrderStatus: async (orderId: string, status: string) => {
            try {
                const response = await axios.patch(
                    `${API_END_POINT}/orders/${orderId}/status`,
                    { orderStatus: status }
                );
                if (response.data.success) {
                    const updatedOrders = get().restaurantOrders.map((order: any) => {
                        // Field's name on your model is 'status', so update 'status' here too
                        return order._id === orderId
                            ? { ...order, status: response.data.data.status }
                            : order;
                    });

                    set({ restaurantOrders: updatedOrders });
                    toast.success(response.data.message);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message;
                toast.error(errorMessage);
                console.error("Order status update failed:", error);
                throw error;
            }
        },
        getAllRestaurants: async () => {
            try {
                set({ loading: true });
                const response = await axios.get(`${API_END_POINT}/all-restaurants`);

                if (response.data.success) {
                    set({
                        loading: false,
                        allRestaurants: response.data.data,
                    });
                }

            } catch (error: any) {
                set({ loading: false });
                console.error(error);
            }
        },
    }), {
        name: 'restaurant-storage',
        storage: createJSONStorage(() => localStorage),
    })
);

