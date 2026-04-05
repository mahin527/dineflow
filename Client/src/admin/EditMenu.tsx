import { useEffect, type Dispatch, type SetStateAction } from "react"
import { toast } from "sonner";
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
import { CircleDollarSign, FileImage, Hamburger, Loader2, ScrollText, Trash2 } from "lucide-react"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { menuFormSchema } from "@/schema/AddMenuSchema"
import { useMenuStore } from "@/store/useMenuStore";


function EditMenu({ selectedMenu, editOpen, setEditOpen }: { selectedMenu: any, editOpen: boolean, setEditOpen: Dispatch<SetStateAction<boolean>> }) {

    const { input, handleInputChange, setInput } = useForm({
        menuTitle: "",
        description: "",
        price: "",
        image: undefined as File | undefined
    });

    const { loading, deleteMenu, updateMenu } = useMenuStore()

    const editMenuFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formattedData = {
            ...input,
            price: Number(input.price)
        }

        const result = menuFormSchema.safeParse(formattedData);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const firstErrorKey = Object.keys(fieldErrors)[0] as keyof typeof fieldErrors;
            const errorMessage = fieldErrors[firstErrorKey]?.[0];

            if (errorMessage) {
                toast.error(errorMessage);
            }
            return;
        }

        try {
            const formData = new FormData();

            formData.append("menuTitle", input.menuTitle);
            formData.append("description", input.description);
            formData.append("price", String(input.price));

            if (input.image) {
                formData.append("menuImage", input.image);
            }

            await updateMenu(selectedMenu._id, formData);

            toast.success("Menu updated successfully");

            setEditOpen(false);

        } catch (error) {
            console.log(error);
            toast.error("Update failed");
        }

    }

    useEffect(() => {
        setInput({
            menuTitle: selectedMenu.menuTitle,
            description: selectedMenu.description,
            price: String(selectedMenu.price),
            image: undefined // important
        })
    }, [selectedMenu, setInput])


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
                                            name="image"
                                            id="image"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => setInput({ ...input, image: e.target.files?.[0] })}
                                        />
                                    </label>
                                </div>
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
                            <Button
                                variant="destructive"
                                onClick={async () => {
                                    await deleteMenu(selectedMenu._id);
                                    setEditOpen(false);
                                }}
                            >
                                <Trash2 />
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditMenu