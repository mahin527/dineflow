export type CheckoutSessionReq = {
    cartItems: {
        menuId: string;
        menuTitle: string;
        price: number;
        menuImage: string;
        quantity: number;
    }[],
    deliveryDetails: {
        fullname: string;
        contact: string;
        email: string;
        address: string;
        city: string;
        country: string;
    },
    restaurantId: string
}

export interface Orders extends CheckoutSessionReq {
    _id: string;
    status: string;
    totalAmount: number;
}

export type OrderState = {
    loading: boolean;
    orders: Orders[];
    createCheckoutSession: (checkoutSessionReq: CheckoutSessionReq) => Promise<void>;
    getOrderDetails: () => Promise<void>;
}