import { Button } from "@/components/ui/button"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { restaurantFormSchema } from "@/schema/RestaurantSchema";
import { Clock, FileImage, Hamburger, Loader2, LocationEdit, MapPinned, UtensilsCrossed } from "lucide-react"
import { toast } from "sonner";
import { useForm } from "@/hooks/useForm"
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";
import { type RestaurantFormData } from "@/types/restaurant.types"


function Restaurant() {

    const { input, handleInputChange, setInput } = useForm<RestaurantFormData>({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: "",
        cuisines: "",
        restaurantPicture: undefined
    });

    const { loading, createRestaurant, restaurant, updateRestaurant, getRestaurant } = useRestaurantStore()

    const restaurantFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. Formatting data (for Zod validation)
        const cuisinesArray = typeof input.cuisines === "string"
            ? input.cuisines.split(",").map((c) => c.trim())
            : input.cuisines;

        const formattedData = {
            ...input,
            deliveryTime: Number(input.deliveryTime),
            cuisines: cuisinesArray,
        };

        const result = restaurantFormSchema.safeParse(formattedData);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const firstErrorKey = Object.keys(fieldErrors)[0] as keyof typeof fieldErrors;
            const errorMessage = fieldErrors[firstErrorKey]?.[0];

            if (errorMessage) {
                toast.error(errorMessage);
            }
            return;
        }

        try {
            const formData = new FormData();
            formData.append("restaurantName", input.restaurantName);
            formData.append("city", input.city);
            formData.append("country", input.country);
            formData.append("deliveryTime", input.deliveryTime);

            // Important here: sent by stringify
            formData.append("cuisines", JSON.stringify(cuisinesArray));

            if (input.restaurantPicture) {
                formData.append("restaurantPicture", input.restaurantPicture); // Make sure Route is also named "image"
            }

            // check if there's restaurant.id or restaurant._id
            if (restaurant && (restaurant._id)) {
                // Update only if ID is available
                await updateRestaurant(formData);
            } else {
                // Otherwise create new
                await createRestaurant(formData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRestaurant();
    }, []);

    useEffect(() => {
        if (restaurant) {
            setInput({
                restaurantName: restaurant.restaurantName || "",
                city: restaurant.city || "",
                country: restaurant.country || "",
                deliveryTime: restaurant.deliveryTime?.toString() || "",
                cuisines: restaurant.cuisines?.join(", ") || "",
                restaurantPicture: undefined
            });
        }
    }, [restaurant]);

    // useEffect(() => {
    //     const fetchRestaurant = async () => {
    //         await getRestaurant()
    //         setInput({
    //             restaurantName: restaurant?.restaurantName || "",
    //             city: restaurant?.city || "",
    //             country: restaurant?.country || "",
    //             deliveryTime: restaurant?.deliveryTime?.toString() || "",
    //             cuisines: restaurant?.cuisines?.join(", ") || "",
    //             restaurantPicture: undefined
    //         })
    //     }

    //     fetchRestaurant()
    // }, [])


    return (
        <div className="@container mx-auto px-6">
            <div className="py-6">
                <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
                    Add Restaurant
                </h2>
            </div>
            <form onSubmit={restaurantFormSubmitHandler}>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-3 md:gap-5 pb-10 space-y-2">
                    <div className="w-full">
                        <InputWithIcon
                            name="restaurantName"
                            id="restaurantName"
                            leftIcon={UtensilsCrossed}
                            type="text"
                            placeholder="Restaurant name"
                            value={input.restaurantName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <InputWithIcon
                            name="city"
                            id="city"
                            leftIcon={MapPinned}
                            type="text"
                            placeholder="City"
                            value={input.city}
                            onChange={handleInputChange}
                            required
                        />

                    </div>
                    <div className="w-full">
                        <InputWithIcon
                            name="country"
                            id="country"
                            leftIcon={LocationEdit}
                            type="text"
                            placeholder="country"
                            value={input.country}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <InputWithIcon
                            name="deliveryTime"
                            id="deliveryTime"
                            leftIcon={Clock}
                            type="text"
                            placeholder="Delivery time (minutes)"
                            value={input.deliveryTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <InputWithIcon
                            name="cuisines"
                            id="cuisines"
                            leftIcon={Hamburger}
                            type="text"
                            placeholder="Enter cuisines separated by commas"
                            onChange={handleInputChange}
                            value={input.cuisines}
                            required
                        />
                    </div>
                    <div className="w-full text-muted-foreground py-2 rounded-lg border border-input dark:bg-input/30 dark:disabled:bg-input/80 ">
                        <label className="cursor-pointer">
                            <span className="flex items-center gap-2 pl-3">
                                <FileImage /> Upload Image
                            </span>
                            <input
                                type="file"
                                name="restaurantPicture"
                                id="image"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setInput({ ...input, restaurantPicture: e.target.files?.[0] })}
                            />
                        </label>
                    </div>
                </div>
                <div className="text-center">
                    {loading ? (
                        <Button disabled className="bg-orange-600 py-5 px-4 rounded-xl text-xs md:text-sm xl:text-base">
                            <Loader2 className="animate-spin mr-2" /> Please wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                            {restaurant ? "Update restaurant" : "Add restaurant"}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Restaurant