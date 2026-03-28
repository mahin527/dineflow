import Image from "@/assets/hero-img.png"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
function Success() {
    const orders = [1]
    return (
        <div className="@container mx-auto px-6 py-8 flex flex-col items-center justify-center">
            {
                orders.length === 0
                    ?
                    <div className="text-center py-16">
                        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wider">
                            Order not found!
                        </h2>
                    </div>
                    :
                    <div className="max-w-md xl:max-w-xl shadow-md shadow-neutral-600 dark:shadow-neutral-800 p-8 rounded-lg">
                        <div className="text-center pb-6">
                            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-wider">
                                Order status: <span className="font-black">{"Confirmed"}</span>
                            </h2>
                        </div>
                        <div className="py-6 border-y">
                            <h4 className="text-center text-lg font-bold">Order summery</h4>
                            <div className="flex items-center justify-center gap-10 md:gap-16 py-2">
                                <div className="flex items-center justify-center gap-3 md:gap-4 xl:gap-6">
                                    <img src={Image} alt="image" className="size-16 md:size-18 xl:size-20" />
                                    <h5>Chicken Tandoori</h5>
                                </div>
                                <p>180$</p>
                            </div>
                        </div>
                        <div className="text-center py-4">
                            <Link to="/">
                                <Button className="px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                    Continue shopping
                                </Button>
                            </Link>

                        </div>
                    </div>
            }
        </div>
    )
}

export default Success