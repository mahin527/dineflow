import Image from "@/assets/menuBanner.jpg"
import { Badge } from "./ui/badge"
import { Timer, X } from "lucide-react"
import AvailableMenu from "./AvailableMenu"

function RestaurantDetails() {
    return (
        <div className="@container mx-auto px-6 py-3">
            <div className="w-full">
                <div className="relative w-full h-32 md:h-64 lg:h-72">
                    <img src={Image} alt="img" className="object-cover w-full h-full rounded-md" />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between">
                <div className="py-3">
                    <h2 className="font-bold text-xl md:text-2xl xl:text-3xl">
                        Foodie Plaza
                    </h2>
                    <div className="flex flex-wrap gap-2 py-2">
                        {
                            ["biryani", "momos", "jalebi"].map((cuisin: string, index: number) => (
                                <div key={index} className="relative inline-flex items-center max-w-full">
                                    <Badge className="rounded-md hover:cursor-pointer whitespace-nowrap pr-5">{cuisin}</Badge>
                                    <X size={16} className="absolute text-white dark:text-black right-1 cursor-pointer" />
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 py-3">
                        <div className="flex items-center gap-2">
                            <Timer size={24} />
                            <h3>Delivery Time: {" "}
                                <span>45 Mins</span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <AvailableMenu />
        </div>
    )
}

export default RestaurantDetails