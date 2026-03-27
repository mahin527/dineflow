import { Link, useParams } from "react-router-dom"
import FilterPage from "./FilterPage"
import { InputWithIcon } from "./ui/input-with-icon"
import { MapPin, Search, X } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import HeroImg from "@/assets/hero-img.png"


function SearchPage() {
    const params = useParams()
    const [searchQuery, setSearchQuery] = useState<string>("")

    return (
        <div className="@container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <FilterPage />
                <div className="flex-1">
                    <div className="flex gap-3 items-center">
                        <InputWithIcon
                            name="search"
                            leftIcon={Search}
                            type="search"
                            placeholder="Search by restaurant & cuisines... "
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                        />
                        <Button type="submit" className="px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                            Search
                        </Button>
                    </div>
                    {/* Search items display here */}
                    <div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center my-3">
                            <h2 className="font-bold text-lg xl:text-2xl">(2) Search result found.</h2>
                            <div className="flex flex-wrap gap-2">
                                {
                                    ["biryani", "momos", "jalebi"].map((selectedFilter: string, index: number) => (
                                        <div key={index} className="relative inline-flex items-center max-w-full">
                                            <Badge className="rounded-md hover:cursor-pointer whitespace-nowrap pr-5">{selectedFilter}</Badge>
                                            <X size={16} className="absolute text-white dark:text-black right-1 cursor-pointer" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {/* Restaurent cards here */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 py-6">
                            {
                                [1, 2, 3, 4].map((item: number, index: number) => (
                                    <Card key={index} className="relative mx-auto w-full max-w-sm pt-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg shadow-neutral-600 dark:shadow-neutral-800 transition-shadow duration-300">
                                        <div className="absolute inset-0 z-30 aspect-video bg-black/5 dark:bg-white/5" />
                                        <img
                                            src={HeroImg}
                                            alt="Event cover"
                                            className="relative z-20 aspect-video w-full object-cover"
                                        />
                                        <CardAction className="absolute z-22 py-2 px-2">
                                            <Badge>Featured</Badge>
                                        </CardAction>
                                        <CardHeader>
                                            <CardTitle>Pizza Hunt</CardTitle>
                                            <CardDescription>
                                                <div>
                                                    <div className="flex gap-1 items-center">
                                                        <MapPin size={16} />
                                                        <p className="font-bold">Location</p>
                                                    </div>
                                                    Rodovia Br 469, Iguassu National Park, Brazil
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardAction className="flex flex-wrap gap-2 items-center px-3">
                                            {
                                                ["biryani", "momos", "jalebi"].map((cuisine: string, index: number) => (
                                                    <div key={index} className="relative inline-flex items-center max-w-full">
                                                        <Badge variant="outline" className="rounded-md hover:cursor-pointer whitespace-nowrap pr-5">{cuisine}</Badge>
                                                        <X size={16} className="absolute right-1 cursor-pointer" />
                                                    </div>
                                                ))
                                            }
                                        </CardAction>
                                        <CardFooter>
                                            <Link to={`/restaurant/${123}`} >
                                                <Button className="w-full px-5 py-5" size="lg">View Menu</Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage


