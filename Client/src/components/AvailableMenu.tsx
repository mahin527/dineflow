import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import type { MenuItem } from "@/types/restaurant.types"


function AvailableMenu({ menus }: { menus: MenuItem[] }) {
    return (
        <div className="py-2">
            <h2 className="text-xl md:text-2xl xl:text-3xl pb-2 text-center md:text-left">Available Menu</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
                {
                    menus?.map((menu: MenuItem) => (
                        <Card key={menu._id} className="relative mx-auto w-full max-w-xs pt-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg shadow-neutral-600 dark:shadow-neutral-800 transition-shadow duration-300">
                            <div className="absolute inset-0 aspect-video bg-black/5 dark:bg-white/5" />
                            <img
                                src={menu.menuImage}
                                alt="Event cover"
                                className="relative aspect-video w-full object-cover"
                            />
                            <CardAction className="absolute py-2 px-2">
                                <Badge>Featured</Badge>
                            </CardAction>
                            <CardHeader className="min-h-38">
                                <CardTitle>{menu.menuTitle}</CardTitle>
                                <CardDescription>
                                    <p>
                                        {menu.description}
                                    </p>
                                    <h4 className="font-medium text-base xl:text-lg pt-2">Price: {menu.price}$</h4>
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Link to={`/cart`} className="w-full" >
                                    <Button className="w-full px-5 py-5" size="lg">Add to Cart</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))
                }

            </div>
        </div>
    )
}

export default AvailableMenu