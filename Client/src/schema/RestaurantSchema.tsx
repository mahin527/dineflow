import * as z from "zod";

export const restaurantFormSchema = z.object({
    restaurantName: z.string().min(2, { error: "Restaurant name is required!" }),
    city: z.string().min(1, "City is required!"),
    country: z.string().min(1, "Country is required!"),
    deliveryTime: z.number().min(0, "Delivery time cannot be negative"),
    cuisines: z.array(z.string()),
    image: z.instanceof(File).optional().refine((file) => file?.size !== 0, { error: "Image file is required!" })
});

export type RestaurantFormState = z.infer<typeof restaurantFormSchema>;
