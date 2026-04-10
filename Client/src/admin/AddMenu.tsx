import { Button } from "@/components/ui/button"
import { toast } from "sonner";
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
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { CircleDollarSign, FileImage, Hamburger, Loader2, Plus, ScrollText } from "lucide-react"
import React, { useState } from "react"
import EditMenu from "./EditMenu"
import { useForm } from "@/hooks/useForm"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { menuFormSchema } from "@/schema/AddMenuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Link } from "react-router-dom";

function AddMenu() {
    const [open, setOpen] = useState<boolean>(false); // It will control the new menu dialog
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<any>({});

    const { input, handleInputChange, setInput } = useForm({
        menuTitle: "",
        description: "",
        price: "",
        menuImage: undefined as File | undefined
    });

    const { restaurant } = useRestaurantStore()
    const { loading, createMenu } = useMenuStore()

    const addMenuFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formattedData = {
            menuTitle: input.menuTitle, // Make sure your schema has the name 'menuTitle'
            description: input.description,
            price: Number(input.price),
            menuImage: input.menuImage
        };

        const result = menuFormSchema.safeParse(formattedData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const firstErrorKey = Object.keys(fieldErrors)[0] as keyof typeof fieldErrors;
            const errorMessage = fieldErrors[firstErrorKey]?.[0];
            toast.error(errorMessage || "Validation failed");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("menuTitle", input.menuTitle);
            formData.append("description", input.description);
            formData.append("price", input.price);
            if (input.menuImage) {
                formData.append("menuImage", input.menuImage);
            }

            await createMenu(formData);

            // 1. Reset form
            setInput({ menuTitle: "", description: "", price: "", menuImage: undefined });

            // 2. Closing the dialog (not setEditOpen, it would be setOpen)
            setOpen(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="@container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-between">
                <div className="py-2">
                    <h2 className="text-xl md:text-2xl xl:text-3xl pb-2 font-bold">Available Menus</h2>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="text-orange-600 hover:text-orange-700 rounded-xl" variant="outline" size="lg" onClick={() => setOpen(true)}>
                            Add Menu <Plus className="font-bold" />
                        </Button>
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
                                        name="menuTitle"
                                        id="title"
                                        leftIcon={Hamburger}
                                        type="text"
                                        placeholder="Enter menu title"
                                        value={input.menuTitle}
                                        onChange={handleInputChange}
                                        required
                                    />
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
                                                name="menuImage"
                                                id="image"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => setInput({ ...input, menuImage: e.target.files?.[0] })}
                                            />
                                        </label>
                                    </div>
                                </Field>
                            </FieldGroup>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button className="border-orange-600 text-orange-600 hover:text-orange-700 rounded-xl" variant="outline">Cancel</Button>
                                </DialogClose>
                                {loading ? (
                                    <Button disabled className="bg-orange-600 rounded-xl text-xs md:text-sm xl:text-base">
                                        <Loader2 className="animate-spin mr-2" /> Please wait...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="text-xs md:text-sm xl:text-base bg-orange-600 hover:bg-orange-700 text-white rounded-xl">
                                        Create Menu
                                    </Button>
                                )}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {/* Show menus */}
            <div className="py-6">
                {
                    restaurant?.menus?.length === 0 ? <div className="text-center py-16 space-y-2">
                        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wider">
                            Empty!
                        </h2>
                        <Button className="px-5 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                            <Link to="/">
                                Go Home
                            </Link>
                        </Button>
                    </div> : <div className="w-full flex flex-col md:flex-row md:items-center justify-center flex-wrap gap-5">
                        {restaurant?.menus?.map((menu: any) => (
                            <Card key={menu._id} className="relative w-full max-w-xs min-w-100 pt-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg shadow-neutral-600 dark:shadow-neutral-800 transition-shadow duration-300">
                                <div className="absolute inset-0 aspect-video bg-black/5 dark:bg-white/5" />
                                <img
                                    src={menu.menuImage}
                                    alt={menu.menuTitle}
                                    className="relative aspect-video w-full object-cover"
                                />
                                <CardHeader>
                                    <CardTitle className="capitalize">{menu.menuTitle}</CardTitle>
                                    <CardDescription className="min-h-20">
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
                                        className="w-full  bg-orange-600 hover:bg-orange-700 text-white rounded-xl" size="lg">Edit</Button>
                                </CardFooter>
                            </Card>
                        ))}

                    </div>
                }

            </div>
            <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />
        </div>
    )
}

export default AddMenu