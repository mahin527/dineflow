import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "@/assets/menuBanner.jpg"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"



function AvailableMenu() {
    return (
        <div className="py-2">
            <h2 className="text-xl md:text-2xl xl:text-3xl pb-2">Available Menu</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Card className="relative mx-auto w-full max-w-xs pt-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg shadow-neutral-600 dark:shadow-neutral-800 transition-shadow duration-300">
                    <div className="absolute inset-0 aspect-video bg-black/5 dark:bg-white/5" />
                    <img
                        src={Image}
                        alt="Event cover"
                        className="relative aspect-video w-full object-cover"
                    />
                    <CardAction className="absolute py-2 px-2">
                        <Badge>Featured</Badge>
                    </CardAction>
                    <CardHeader>
                        <CardTitle>Tandoori Biryani</CardTitle>
                        <CardDescription>
                            <p>
                                Rodovia Br 469, Iguassu National Park, Brazil
                            </p>
                            <h4 className="font-medium text-base xl:text-lg pt-2">Price: 180$</h4>
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Link to={`/cart`} className="w-full" >
                            <Button className="w-full px-5 py-5" size="lg">Add to Cart</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default AvailableMenu