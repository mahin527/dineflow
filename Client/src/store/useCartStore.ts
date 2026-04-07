import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartState, CartItem } from "@/types/cart.types"
import { toast } from "sonner";

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],

            // 1. Add items to cart
            addToCart: (item: CartItem) => set((state) => {
                const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);
                if (existingItem) {
                    // If the item already exists, only the quantity will increase.
                    return {
                        cart: state.cart.map((cartItem) =>
                            cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                        ),
                    };
                }
                toast.success("Item added to cart!");
                // If there is a new item, it will be pushed into the array.
                return { cart: [...state.cart, { ...item, quantity: 1 }] };
            }),

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

