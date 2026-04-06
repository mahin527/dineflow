import type { MenuItem } from '@/types/restaurant.types';


// Defining the type of cart item (good for TypeScript)
export interface CartItem extends MenuItem {
    quantity: number;
}

export interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (menuId: string) => void;
    incrementQuantity: (menuId: string) => void;
    decrementQuantity: (menuId: string) => void;
    clearCart: () => void;
}