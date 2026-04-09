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
                    // // Check if there are any other restaurant items in the cart
                    const isDifferentRestaurant = state.cart.length > 0 && state.cart[0].restaurantId !== restaurantId;

                    if (isDifferentRestaurant) {
                        // If it's a different restaurant, don't update the cart and give an error message.
                        toast.error("Your cart contains items from another restaurant. Clear your cart first!");
                        return { cart: state.cart }; //The previous cart will return.
                    }

                    const existingItem = state.cart.find((item) => item._id === menuItem._id);

                    if (existingItem) {
                        toast.success(`${menuItem.menuTitle} quantity updated!`);
                        return {
                            cart: state.cart.map((item) =>
                                item._id === menuItem._id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    toast.success('Item is successfully added to the cart!');
                    return {
                        cart: [...state.cart, { ...menuItem, quantity: 1, restaurantId }],
                    };
                });
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

