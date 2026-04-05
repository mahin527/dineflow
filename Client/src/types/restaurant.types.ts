export interface MenuItem {
    _id: string;
    menuTitle: string;
    description: string;
    price: number;
    menuImage: string;
    menuImageId: string;
}

export interface RestaurantTypes {
    _id: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    restaurantPicture: string;
    restaurantPicturePublicId: string;
    menus: MenuItem[];

}

export interface RestaurantState {
    loading: boolean;
    restaurant: RestaurantTypes | null;
    isAuthenticated: boolean;
    appliedFilter: string[];
    createRestaurant: (formData: FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (formData: FormData) => Promise<void>;
    searchRestaurants: (searchText: string, searchQuery: string, searchCuisines: any) => Promise<void>;
    addMenuToRestaurant: (menu: MenuItem) => Promise<void>;
    setAppliedFilter: (value: string) => Promise<void>;
    searchedRestaurant: any;
}
