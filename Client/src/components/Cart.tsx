import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuantitySelector } from "./QuantitySelector"
import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import CheckoutConfirmPage from "./CheckoutConfirmPage"
import { useState } from "react"
import { useCartStore } from "@/store/useCartStore"
import type { CartItem } from "@/types/cart.types"
import { Link } from "react-router-dom"


function Cart() {
    const [open, setOpen] = useState<boolean>(false)
    const { cart, removeFromCart, clearCart } = useCartStore()

    let totalAmount = cart.reduce((acc, ele) => {
        return acc + ele.price * ele.quantity
    }, 0)
    return (
        <div className="@container mx-auto px-6 py-3">
            {
                cart?.length > 0 ? (
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            {
                                cart?.map((cartItem: CartItem) => (
                                    <TableBody key={cartItem._id}>
                                        <TableRow>
                                            <TableCell className="flex items-center gap-2">
                                                <Avatar size='lg'>
                                                    <AvatarImage src={cartItem.menuImage} alt={cartItem.menuTitle} />
                                                    <AvatarFallback>
                                                        {cartItem.menuTitle.charAt(0).toUpperCase() || "CN"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <p className="font-medium">
                                                    {cartItem.menuTitle}
                                                </p>
                                            </TableCell>
                                            <TableCell>${cartItem.price}</TableCell>
                                            <TableCell className="flex items-center gap-2">
                                                <QuantitySelector menuId={cartItem._id} quantity={cartItem.quantity} />
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => removeFromCart(cartItem._id)}
                                                >
                                                    <Trash2 size={20} />
                                                </Button>

                                            </TableCell>
                                            <TableCell>
                                                {cartItem.price * cartItem.quantity}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                ))
                            }

                            <TableFooter className="w-full">
                                <TableRow className="w-full">
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-right pr-5 font-bold text-base">Total: </TableCell>
                                    <TableCell className="font-bold text-base">{totalAmount}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                        <div className="flex items-center justify-end gap-5 flex-wrap py-6">
                            <Button onClick={() => setOpen(true)} className="py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                Proceed to Checkout
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={clearCart}
                            >
                                <Trash2 size={26} />
                            </Button>
                        </div>
                        <CheckoutConfirmPage open={open} setOpen={setOpen} />
                    </div>

                ) : (
                    <div className="text-center py-10 pr-0 lg:pr-10 space-y-2">
                        <h3 className="text-xl font-semibold">Your cart is empty!</h3>
                        <p className="text-muted-foreground">Please add to cart and enjoy your meal.</p>
                        <Button className="px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                            <Link to="/">
                                Go Home
                            </Link>
                        </Button>
                    </div>
                )

            }

        </div>
    )
}

export default Cart