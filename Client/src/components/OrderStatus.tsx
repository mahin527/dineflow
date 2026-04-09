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
    const { orders, getOrderDetails, loading } = useOrderStore(); 

    useEffect(() => {
        getOrderDetails();
    }, []);

    if (loading) {
        return <div className="text-center py-20 font-bold text-base lg:text-xl xl:text-2xl">Please wait...</div>;
    }
    return (
        <div className="@container mx-auto px-5 py-10">

            {orders && orders.length > 0 ? (
                <div className="shadow-md ...">
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
            ) : (
                <div className="text-center py-16 space-y-2">
                    <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wider">
                        Order not found!
                    </h2>
                    <Button className="px-5 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                        <Link to="/">
                            Go Home
                        </Link>
                    </Button>
                </div>
            )}

        </div>
    )
}

export default OrderStatus

