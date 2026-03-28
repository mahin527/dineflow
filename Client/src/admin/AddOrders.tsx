import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "@/assets/menuBanner.jpg"
import { Label } from "@/components/ui/label"

function AddOrders() {
    return (
        <div className="@container mx-auto px-6 py-8">
            <div>
                <div className="py-6">
                    <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
                        Orders Overview
                    </h2>
                </div>
                <div className="flex flex-wrap gap-6">
                    <Card className="relative max-w-xs pt-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg shadow-neutral-600 dark:shadow-neutral-800 transition-shadow duration-300">
                        <img
                            src={Image}
                            alt="Event cover"
                            className="relative aspect-3/1 object-cover"
                        />
                        <CardAction className="absolute py-2 px-2">

                        </CardAction>
                        <CardHeader>
                            <CardTitle>Tandoori Biryani</CardTitle>
                            <CardDescription>
                                <p>
                                    <span>Address: </span> Rodovia Br 469, Iguassu National Park, Brazil
                                </p>
                                <h4 className="font-medium text-base xl:text-lg pt-2"><span>Total: </span> 180$</h4>
                                <div className="space-y-3">
                                    <Label className="pt-3">Order Status</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    ["Pending", "Preparing", "Confirmed", "Cancelled", "Delivered"].map((option: string, index: number) => (
                                                        <SelectItem key={index} value={option}>{option}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AddOrders