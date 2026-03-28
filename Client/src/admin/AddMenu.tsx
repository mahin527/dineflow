import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Badge, CircleDollarSign, FileImage, Hamburger, Loader2, Plus, ScrollText } from "lucide-react"
import Image from "@/assets/menuBanner.jpg"
import React, { useState } from "react"
import EditMenu from "./EditMenu"
import { useForm } from "@/hooks/useForm"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { menuFormSchema } from "@/schema/AddMenuSchema";

function AddMenu() {
    const loading: boolean = false;
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<any>({});
    const menus = [
        {
            title: "Biryani",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, veritatis!",
            price: 80,
            image: Image
        }, {
            title: "Chicken Tandoori",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, veritatis!",
            price: 180,
            image: Image
        },
    ]

    const { input, handleInputChange, setInput } = useForm({
        title: "",
        description: "",
        price: "",
        image: undefined as File | undefined
    });
    const [errors, setErrors] = useState<any>({})

    const addMenuFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formattedData = {
            ...input,
            price: Number(input.price)
        }

        const result = menuFormSchema.safeParse(formattedData);

        if (!result.success) {
            setErrors(result.error.format());
            return;
        }

        setErrors({});
        console.log("Data:", result.data);

    }

    return (
        <div className="@container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-between">
                <div className="py-2">
                    <h2 className="text-xl md:text-2xl xl:text-3xl pb-2 font-bold">Available Menus</h2>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="lg">Add Menu <Plus className="font-bold" /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <form onSubmit={addMenuFormSubmitHandler}>
                            <DialogHeader>
                                <DialogTitle className="text-center font-bold text-lg xl:text-xl">Add a New Menu</DialogTitle>
                                <DialogDescription className="text-center">
                                    Create a menu that will make your restaurant stand out.
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup className="py-4">
                                <Field>
                                    <Label htmlFor="title">Title</Label>
                                    <InputWithIcon
                                        name="title"
                                        id="title"
                                        leftIcon={Hamburger}
                                        type="text"
                                        placeholder="Enter menu title"
                                        value={input.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.title?._errors?.[0] && (
                                        <p className="text-red-500 text-xs md:text-sm">
                                            {errors.title._errors[0]}
                                        </p>
                                    )}
                                </Field>
                                <Field>
                                    <Label htmlFor="description">Description</Label>
                                    <InputWithIcon
                                        name="description"
                                        id="description"
                                        leftIcon={ScrollText}
                                        type="text"
                                        placeholder="Enter menu description"
                                        value={input.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.description?._errors?.[0] && (
                                        <p className="text-red-500 text-xs md:text-sm">
                                            {errors.description._errors[0]}
                                        </p>
                                    )}
                                </Field>
                                <Field>
                                    <Label htmlFor="price">Price</Label>
                                    <InputWithIcon
                                        name="price"
                                        id="price"
                                        leftIcon={CircleDollarSign}
                                        type="text"
                                        placeholder="Enter menu price"
                                        value={input.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.price?._errors?.[0] && (
                                        <p className="text-red-500 text-xs md:text-sm">
                                            {errors.price._errors[0]}
                                        </p>
                                    )}
                                </Field>
                                <Field>
                                    Image
                                    <div className="w-full text-muted-foreground py-2 rounded-lg border border-input dark:bg-input/30 dark:disabled:bg-input/80 ">
                                        <label className="cursor-pointer">
                                            <span className="flex items-center gap-2 pl-3">
                                                <FileImage /> Upload Image
                                            </span>
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setInput({ ...input, image: e.target.files?.[0] })}
                                            />
                                        </label>
                                    </div>
                                    {errors.image?._errors?.[0] && (
                                        <p className="text-red-500 text-xs md:text-sm">
                                            {errors.image._errors[0]}
                                        </p>
                                    )}
                                </Field>
                            </FieldGroup>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                {loading ? (
                                    <Button disabled className="rounded-xl text-xs md:text-sm xl:text-base">
                                        <Loader2 className="animate-spin mr-2" /> Please wait...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="rounded-xl text-xs md:text-sm xl:text-base">
                                        Submit Menu
                                    </Button>
                                )}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {/* Show menus */}
            <div className="py-6">
                <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-5">
                    {menus.map((menu: any, index: number) => (
                        <Card key={index} className="relative w-full max-w-xs pt-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg shadow-neutral-600 dark:shadow-neutral-800 transition-shadow duration-300">
                            <div className="absolute inset-0 aspect-video bg-black/5 dark:bg-white/5" />
                            <img
                                src={menu.image}
                                alt="Event cover"
                                className="relative aspect-video w-full object-cover"
                            />
                            <CardAction className="absolute py-2 px-2">
                                <Badge>Featured</Badge>
                            </CardAction>
                            <CardHeader>
                                <CardTitle>{menu.title}</CardTitle>
                                <CardDescription>
                                    <p>
                                        {menu.description}
                                    </p>
                                    <h4 className="font-medium text-base xl:text-lg pt-2">Price: {menu.price}$</h4>
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button
                                    onClick={() => {
                                        setSelectedMenu(menu);
                                        setEditOpen(true);
                                    }}
                                    className="w-full px-5 py-5" size="lg">Edit</Button>
                            </CardFooter>
                        </Card>
                    ))}

                </div>
            </div>
            <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />
        </div>
    )
}

export default AddMenu