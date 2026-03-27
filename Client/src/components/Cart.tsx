import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { QuantitySelector } from "./QuantitySelector"
import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import CheckoutConfirmPage from "./CheckoutConfirmPage"
import { useState } from "react"


function Cart() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="@container mx-auto px-6 py-3">
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
                    <TableBody>
                        <TableRow>
                            <TableCell className="flex items-center gap-2">
                                <Avatar size='lg'>
                                    <AvatarImage />
                                    <AvatarFallback>
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <p className="font-medium">
                                    Wireless Mouse
                                </p>
                            </TableCell>
                            <TableCell>$29.99</TableCell>
                            <TableCell className="flex items-center gap-2">
                                <QuantitySelector />
                                <Button
                                    variant="ghost"
                                    className=""
                                >
                                    <Trash2 size={20} />
                                </Button>

                            </TableCell>
                            <TableCell>
                                500$
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter className="w-full">
                        <TableRow className="w-full">
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-right pr-5 font-bold text-base">Total: </TableCell>
                            <TableCell className="font-bold text-base">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                <div className="text-right p-5">
                    <Button onClick={() => setOpen(true)} className="py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                        Proceed to Checkout
                    </Button>
                </div>
                <CheckoutConfirmPage open={open} setOpen={setOpen} />
            </div>

        </div>
    )
}

export default Cart