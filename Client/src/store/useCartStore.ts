import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Defining the type of cart item (good for TypeScript)
interface CartItem {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (menuId: string) => void;
    incrementQuantity: (menuId: string) => void;
    decrementQuantity: (menuId: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],

            // 1. Add items to cart
            addToCart: (item) => set((state) => {
                const existingItem = state.cart.find((i) => i.menuId === item.menuId);
                if (existingItem) {
                    // If the item already exists, only the quantity will increase.
                    return {
                        cart: state.cart.map((i) =>
                            i.menuId === item.menuId ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    };
                }
                // If there is a new item, it will be pushed into the array.
                return { cart: [...state.cart, { ...item, quantity: 1 }] };
            }),

            // 2. Removing items from cart
            removeFromCart: (menuId) => set((state) => ({
                cart: state.cart.filter((i) => i.menuId !== menuId),
            })),

            // 3. Increasing the quantity
            incrementQuantity: (menuId) => set((state) => ({
                cart: state.cart.map((i) =>
                    i.menuId === menuId ? { ...i, quantity: i.quantity + 1 } : i
                ),
            })),

            // 4. Reduce the quantity
            decrementQuantity: (menuId) => set((state) => ({
                cart: state.cart.map((i) =>
                    i.menuId === menuId && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
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


// How to use it:
/*
const { cart, addToCart, incrementQuantity } = useCartStore();

// To show how many items are in the cart:
const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);




// const { cart, addToCart, incrementQuantity } = useCartStore();
// const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    
 */