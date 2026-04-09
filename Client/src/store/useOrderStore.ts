import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios";
import { toast } from "sonner";
import type { CheckoutSessionReq, OrderState } from '@/types/order.types';

const API_END_POINT = `https://dineflow-server.onrender.com/api/v1/orders`;
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            loading: false,
            orders: [],

            createCheckoutSession: async (checkoutData: CheckoutSessionReq) => {
                try {
                    set({ loading: true });
                    const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`, checkoutData);

                    if (response.data.success && response.data.session) {
                        const stripeUrl = response.data.session.url;

                        if (stripeUrl) {
                            window.location.href = stripeUrl;
                        } else {
                            console.error("Stripe session URL is missing!");
                        }
                    }
                } catch (error: any) {
                    console.error("Create checkout session error:", error);
                    toast.error(error.response?.data?.message || "Something went wrong");
                } finally {
                    set({ loading: false });
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



