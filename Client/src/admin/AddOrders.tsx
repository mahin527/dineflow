import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function AddOrders() {
    const OrderStatus = ["pending", "preparing", "confirmed", "cancelled", "delivered"]
    const { getRestaurantOrders, updateOrderStatus, restaurantOrders } = useRestaurantStore()

    const changeStatusHandler = async (orderId: string, orderStatus: string) => {
        await updateOrderStatus(orderId, orderStatus)
    }

    useEffect(() => {
        getRestaurantOrders()
    }, [])

    return (
        <div className="@container mx-auto px-6 py-8">
            {
                restaurantOrders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
                        {
                            restaurantOrders.map((order: any) => (
                                order.cartItems.map((item: any) => (
                                    <Card key={item._id} className="relative max-w-xs pt-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg shadow-neutral-600 dark:shadow-neutral-800 transition-shadow duration-300">
                                        <img
                                            src={item.menuImage} alt={item.menuTitle}
                                            className="relative aspect-3/1 object-cover"
                                        />
                                        <CardAction className="absolute py-2 px-2">

                                        </CardAction>
                                        <CardHeader>
                                            <CardTitle>{item.menuTitle}</CardTitle>
                                            <CardDescription>
                                                <p>
                                                    <span className="font-bold">Receiver: </span> {order.deliveryDetails.fullname}.
                                                </p>
                                                <p>
                                                    <span className="font-bold">Address: </span> {order.deliveryDetails.address}, {order.deliveryDetails.city}.
                                                </p>
                                                <h4 className="font-medium text-base xl:text-lg pt-2"><span>Total: </span> {order.total}$</h4>
                                                <div className="space-y-3">
                                                    <Label className="pt-3">Order Status</Label>
                                                    <Select onValueChange={(orderStatus) => changeStatusHandler(order._id, orderStatus)} defaultValue={order.status}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    OrderStatus.map((orderStatus: string, index: number) => (
                                                                        <SelectItem key={index} value={orderStatus}>{orderStatus}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))
                            ))
                        }
                    </div>
                ) :
                    <div className="text-center py-10 pr-0 lg:pr-10 space-y-4">
                        <h3 className="text-xl font-semibold">Empty!</h3>
                        <Button className="px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                            <Link to="/">
                                Go Home
                            </Link>
                        </Button>
                    </div>
            }

        </div>

    )
}

export default AddOrders