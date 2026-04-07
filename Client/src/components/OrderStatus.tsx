import { Button } from "@/components/ui/button"
import { useOrderStore } from "@/store/useOrderStore"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "./ui/badge"


function OrderStatus() {
    const { orders, getOrderDetails } = useOrderStore()
    useEffect(() => {
        getOrderDetails()
    }, [])

    return (
        <div className="@container mx-auto px-5 py-10">
            {
                orders.length === 0
                    ?
                    <div className="text-center py-16 space-y-2">
                        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wider">
                            Order not found!
                        </h2>
                        <Button className="px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                            <Link to="/">
                                Go Home
                            </Link>
                        </Button>
                    </div>
                    :
                    <div className="shadow-md shadow-neutral-600 dark:shadow-neutral-800 p-8 rounded-lg">
                        <div className="text-center pb-6">
                            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-wider">
                                Order summery
                            </h2>
                        </div>
                        <div className="py-6 border-y w-full">
                            <div className="w-full">
                                <Table className="min-w-sm">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead className="text-right">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.map((order: any) => (
                                            order.cartItems.map((item: any) => (
                                                <TableRow key={item._id} className="hover:bg-muted/50">
                                                    <TableCell className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage src={item.menuImage} alt={item.menuTitle} />
                                                            <AvatarFallback>
                                                                {item.menuTitle.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <p className="font-medium capitalize leading-none">
                                                            {item.menuTitle}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>${item.price}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell className="font-semibold">
                                                        ${item.price * item.quantity}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Badge className="capitalize" variant={order.status === 'pending' ? 'outline' : 'default'}>
                                                            {order.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ))}
                                    </TableBody>
                                </Table>
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

export default OrderStatus

