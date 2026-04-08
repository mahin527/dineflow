import type { MenuItem } from '@/types/restaurant.types';


// Defining the type of cart item (good for TypeScript)
export interface CartItem extends MenuItem {
    quantity: number;
    restaurantId: string
}

export interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem, restaurantId: string) => void;
    removeFromCart: (menuId: string) => void;
    incrementQuantity: (menuId: string) => void;
    decrementQuantity: (menuId: string) => void;
    clearCart: () => void;
}