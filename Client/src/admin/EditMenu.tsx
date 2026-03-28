import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
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
import { useForm } from "@/hooks/useForm"
import { CircleDollarSign, FileImage, Hamburger, Loader2, ScrollText } from "lucide-react"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { menuFormSchema } from "@/schema/AddMenuSchema"


function EditMenu({ selectedMenu, editOpen, setEditOpen }: { selectedMenu: any, editOpen: boolean, setEditOpen: Dispatch<SetStateAction<boolean>> }) {
    const loading: boolean = false;

    const { input, handleInputChange, setInput } = useForm({
        title: "",
        description: "",
        price: "",
        image: undefined as File | undefined
    });
    const [errors, setErrors] = useState<any>({})

    const editMenuFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
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

    useEffect(() => {
        setInput({
            title: selectedMenu.title,
            description: selectedMenu.description,
            price: selectedMenu.price,
            image: selectedMenu.image
        })
    }, [selectedMenu])


    return (
        <div>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-xl">
                    <form onSubmit={editMenuFormSubmitHandler}>
                        <DialogHeader>
                            <DialogTitle className="text-center font-bold text-lg xl:text-xl">Edit Menu</DialogTitle>
                            <DialogDescription className="text-center">
                                Update your manu to keep your offerings fresh and exciting!.
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
                                    Update Menu
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditMenu