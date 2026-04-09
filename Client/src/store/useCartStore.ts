import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartState } from "@/types/cart.types"
import type { MenuItem } from '@/types/restaurant.types';
import { toast } from 'sonner';

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],

            // 1. Add items to cart
            addToCart: (menuItem: MenuItem, restaurantId: string) => {
                set((state) => {
                    const existingItem = state.cart.find((item) => item._id === menuItem._id);
                    if (existingItem) {
                        return {
                            cart: state.cart.map((item) =>
                                item._id === menuItem._id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return {
                        cart: [...state.cart, { ...menuItem, quantity: 1, restaurantId }],
                    };
                });
                toast.success('Item is successfully added to the cart!')
            },

            // 2. Removing items from cart
            removeFromCart: (menuId) => set((state) => ({
                cart: state.cart.filter((item) => item._id !== menuId)
            })),

            // 3. Increasing the quantity
            incrementQuantity: (menuId) => set((state) => ({
                cart: state.cart.map((item) =>
                    item._id === menuId ? { ...item, quantity: item.quantity + 1 } : item
                ),
            })),

            // 4. Reduce the quantity
            decrementQuantity: (menuId) => set((state) => ({
                cart: state.cart.map((item) =>
                    item._id === menuId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                ),
            })),

            // 5. Empty the entire cart (required after the order is successful)
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: 'cart-storage', // Will be saved in local storage with this name
            storage: createJSONStorage(() => localStorage),
        }
    )
);

