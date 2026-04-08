import { Badge } from "./ui/badge"
import { MapPin, Timer } from "lucide-react"
import AvailableMenu from "./AvailableMenu"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import type { CartItem } from "@/types/cart.types"

function RestaurantDetails() {
    const params = useParams()
    const restaurantId = params?.restaurantId || ""
    const { singleRestaurant, getSingleRestaurant } = useRestaurantStore()

    useEffect(() => {
        getSingleRestaurant(restaurantId)
    }, [restaurantId])

    return (
        <div className="@container mx-auto px-6 py-3">
            <div className="w-full">
                <div className="relative w-full h-32 md:h-64 lg:h-72">
                    <img src={singleRestaurant?.restaurantPicture} alt={singleRestaurant?.restaurantName} className="object-cover w-full h-full rounded-md" />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center md:justify-between items-center">
                <div className="py-3 space-y-2">
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wider">
                        {singleRestaurant?.restaurantName?.toUpperCase()}
                    </h1>
                    <div className="flex flex-wrap gap-2 py-2">
                        {
                            singleRestaurant?.cuisines?.map((cuisin: string) => (
                                <div key={cuisin} className="relative inline-flex items-center max-w-full">
                                    <Badge variant="outline" className="rounded-xl whitespace-nowrap text-orange-600 border-orange-600">{cuisin}</Badge>
                                </div>
                            ))
                        }
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Timer size={24} />
                            <h3>Delivery Time: {" "}
                                <span>{singleRestaurant?.deliveryTime}</span>
                            </h3>
                        </div>
                        <div className="flex gap-1 items-center">
                            <MapPin size={26} />
                            <p className="font-bold">{singleRestaurant?.city}, {singleRestaurant?.country}</p>
                        </div>
                    </div>
                </div>
            </div>
            <AvailableMenu menus={singleRestaurant?.menus as CartItem[] || []} restaurantId={singleRestaurant?._id || ""} />
        </div>
    )
}

export default RestaurantDetails