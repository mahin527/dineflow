import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios";
import { toast } from "sonner";
import type { CheckoutSessionReq, OrderState } from '@/types/order.types';

const API_END_POINT = `http://localhost:8000/api/v1/orders`;
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            loading: false,
            orders: [],

            createCheckoutSession: async (checkoutSession: CheckoutSessionReq) => {
                try {
                    set({ loading: true });
                    const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session/`, checkoutSession);
                    if (response.data.success) {
                        // ব্যাকএন্ডের ApiResponse অনুযায়ী: response.data.data.sessionUrl
                        const sessionUrl = response.data.data.sessionUrl;
                        window.location.href = sessionUrl;
                        console.log(response.data);

                        set({
                            loading: false
                        });
                    }
                } catch (error: any) {
                    set({ loading: false });
                    const errorMessage = error.response?.data?.message;
                    toast.error(errorMessage);
                    console.error("Create checkout session error:", error);
                    throw error;
                }
            },
            getOrderDetails: async () => {
                try {
                    set({ loading: true });
                    const response = await axios.get(`${API_END_POINT}/`);
                    if (response.data.success) {
                        set({
                            loading: false,
                            orders: response.data.data,
                        });
                    }

                } catch (error) {
                    set({ loading: false });
                    console.log(error);
                }
            }

        }),
        {
            name: 'order-storage', // Will be saved in local storage with this name
            storage: createJSONStorage(() => localStorage),
        }
    )
);



