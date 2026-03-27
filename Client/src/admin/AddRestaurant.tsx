import { Button } from "@/components/ui/button"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { restaurantFormSchema } from "@/schema/RestaurantSchema";
import { Clock, FileImage, Hamburger, Loader2, LocationEdit, MapPinned, UtensilsCrossed } from "lucide-react"
import { useState } from "react";
import { useForm } from "@/hooks/useForm"

interface RestaurantState {
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: string;
    cuisines: string | string[];
    image: File | undefined;
}

function Restaurant() {

    const { input, handleInputChange, setInput } = useForm<RestaurantState>({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: "",
        cuisines: "",
        image: undefined
    });

    const [errors, setErrors] = useState<any>({})

    const restaurantFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const formattedData = {
            ...input,
            deliveryTime: Number(input.deliveryTime), // String to Number conversion
            cuisines: (input.cuisines as string).split(",").map((c: string) => c.trim()),
        };

        const result = restaurantFormSchema.safeParse(formattedData);

        if (!result.success) {
            setErrors(result.error.format());
            return;
        }

        setErrors({});
        console.log("Data:", result.data);
    };

    const loading: boolean = false;
    const isUpdateRestaurant = false
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
                        {errors.restaurantName?._errors?.[0] && (
                            <p className="text-red-500 text-xs md:text-sm">
                                {errors.restaurantName._errors[0]}
                            </p>
                        )}
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
                        {errors.city?._errors?.[0] && (
                            <p className="text-red-500 text-xs md:text-sm">
                                {errors.city._errors[0]}
                            </p>
                        )}
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
                        {errors.country?._errors?.[0] && (
                            <p className="text-red-500 text-xs md:text-sm">
                                {errors.country._errors[0]}
                            </p>
                        )}
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
                        {errors.deliveryTime?._errors?.[0] && (
                            <p className="text-red-500 text-xs md:text-sm">
                                {errors.deliveryTime._errors[0]}
                            </p>
                        )}
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
                        {errors.cuisines?._errors?.[0] && (
                            <p className="text-red-500 text-xs md:text-sm">
                                {errors.cuisines._errors[0]}
                            </p>
                        )}
                    </div>
                    <div className="w-full text-muted-foreground py-2 rounded-lg border border-input dark:bg-input/30 dark:disabled:bg-input/80 ">
                        <label className="cursor-pointer">
                            <span className="flex items-center gap-2 pl-3">
                                <FileImage /> Upload Image
                            </span>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setInput({ ...input, image: e.target.files?.[0] })}
                            />
                        </label>
                        {errors.image?._errors?.[0] && (
                            <p className="text-red-500 text-xs md:text-sm">
                                {errors.image._errors[0]}
                            </p>
                        )}
                    </div>
                </div>
                <div className="text-center">
                    {loading ? (
                        <Button disabled className="py-5 px-4 rounded-xl text-xs md:text-sm xl:text-base">
                            <Loader2 className="animate-spin mr-2" /> Please wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="py-5 px-4 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                            {isUpdateRestaurant ? "Update restaurant" : "Add restaurant"}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default Restaurant