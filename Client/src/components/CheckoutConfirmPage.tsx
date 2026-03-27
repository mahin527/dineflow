import { useState, type Dispatch, type SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { InputWithIcon } from "./ui/input-with-icon"
import { LocationEdit, Mail, MapPinHouse, MapPinned, Phone, UserPen } from "lucide-react"

function CheckoutConfirmPage({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        contact: "",
        address: "",
        city: "",
        country: ""
    })

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const checkoutHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(input);

    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-xl">
                    <form onSubmit={checkoutHandler}>
                        <DialogHeader className="py-4">
                            <DialogTitle className="text-center font-bold text-lg xl:text-xl">Review your order</DialogTitle>
                            <DialogDescription>
                                Double-check your delivery details and make sure everything is ok.
                                When you are ready, press the confirm button to finalize the order.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <div className="flex items-center gap-2">
                                <Field>
                                    <Label htmlFor="fullname">Fullname</Label>
                                    <InputWithIcon
                                        id="fullname"
                                        name="fullname"
                                        leftIcon={UserPen}
                                        type="text"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        required
                                    />
                                </Field>
                                <Field>
                                    <Label htmlFor="contact">Contact</Label>
                                    <InputWithIcon
                                        name="contact"
                                        id="contact"
                                        leftIcon={Phone}
                                        type="number"
                                        value={input.contact}
                                        onChange={changeEventHandler}
                                        required
                                    />
                                </Field>
                            </div>
                            <Field>
                                <Label htmlFor="email">Email</Label>
                                <InputWithIcon
                                    name="email"
                                    id="email"
                                    leftIcon={Mail}
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    required
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="address">Address</Label>
                                <InputWithIcon
                                    name="address"
                                    id="address"
                                    leftIcon={MapPinHouse}
                                    type="text"
                                    value={input.address}
                                    onChange={changeEventHandler}
                                    required
                                />
                            </Field>
                            <div className="flex items-center gap-2 pb-4">
                                <Field>
                                    <Label htmlFor="city">City</Label>
                                    <InputWithIcon
                                        name="city"
                                        id="city"
                                        leftIcon={MapPinned}
                                        type="text"
                                        value={input.city}
                                        onChange={changeEventHandler}
                                        required
                                    />
                                </Field>
                                <Field>
                                    <Label htmlFor="country">Country</Label>
                                    <InputWithIcon
                                        name="country"
                                        id="country"
                                        leftIcon={LocationEdit}
                                        type="text"
                                        value={input.country}
                                        onChange={changeEventHandler}
                                        required
                                    />
                                </Field>
                            </div>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Continue to Payment</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CheckoutConfirmPage