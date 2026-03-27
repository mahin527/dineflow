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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus } from "lucide-react"


function AddMenu() {
    const loading: boolean = false;

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
                        <form>
                            <DialogHeader>
                                <DialogTitle className="text-center font-bold text-lg xl:text-xl">Add a New Menu</DialogTitle>
                                <DialogDescription>
                                    Create a menu that will make your restaurant stand out.
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup className="py-4">
                                <Field>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" type="text" placeholder="Enter menu name" />
                                </Field>
                                <Field>
                                    <Label htmlFor="description">Description</Label>
                                    <Input id="description" name="description" type="text" placeholder="Enter menu description" value={''} />
                                </Field>
                                <Field>
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" name="price" type="text" placeholder="Enter menu price" value={''} />
                                </Field>
                                <Field>
                                    <Label htmlFor="price">Upload image</Label>
                                    <Input id="image" name="image" type="file" />
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
        </div>
    )
}

export default AddMenu