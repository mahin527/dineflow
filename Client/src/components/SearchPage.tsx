import { Link, useParams } from "react-router-dom"
import FilterPage from "./FilterPage"
import { MapPin, X } from "lucide-react"
import { useEffect, useState } from "react"
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
import { useRestaurantStore } from "@/store/useRestaurantStore"
import SearchInputBlock from "./SearchInputBlock";
import { type RestaurantTypes } from "@/types/restaurant.types"
import SearcPageSkeleton from "@/components/SearcPageSkeleton"

function SearchPage() {
    const params = useParams()
    const searchText = params?.searchText || "";
    const [searchQuery] = useState<string>("")
    const { loading, searchedRestaurant, searchRestaurants, appliedFilter, setAppliedFilter } = useRestaurantStore()

    useEffect(() => {
        // Pass all parameters when calling API
        searchRestaurants(searchText, searchQuery, appliedFilter);
    }, [searchText, appliedFilter]); // It is better not to give searchQuery here, if you click or enter the user button, the call will be made.

    return (
        <div className="@container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <FilterPage />
                <div className="flex-1">
                    <div className="flex gap-3 items-center">
                        <SearchInputBlock initialValue={params.searchText || ""} />
                    </div>
                    {/* Search items display here */}
                    <div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center my-3">
                            <h2 className="font-bold text-lg xl:text-2xl">
                                ({searchedRestaurant?.data?.length || 0}) Search result found.
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {
                                    appliedFilter.map((selectedFilter: string, index: number) => (
                                        <div key={index} className="relative inline-flex items-center max-w-full">
                                            <Badge className="rounded-md hover:cursor-pointer whitespace-nowrap pr-5">{selectedFilter}</Badge>
                                            <X size={16} onClick={() => setAppliedFilter(selectedFilter)} className="absolute text-white dark:text-black right-1 cursor-pointer" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {/* Restaurent cards here */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 py-6">
                            {
                                loading ? <SearcPageSkeleton /> : (
                                    searchedRestaurant?.data?.map((restaurant: RestaurantTypes) => (
                                        <Card key={restaurant._id} className="relative mx-auto w-full max-w-sm pt-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg shadow-neutral-600 dark:shadow-neutral-800 transition-shadow duration-300">
                                            <div className="absolute inset-0 aspect-video bg-black/5 dark:bg-white/5" />
                                            <img
                                                src={restaurant.restaurantPicture}
                                                alt={restaurant.restaurantName}
                                                className="relative aspect-video w-full object-cover"
                                            />
                                            <CardAction className="absolute py-2 px-2">
                                                <Badge>Featured</Badge>
                                            </CardAction>
                                            <CardHeader>
                                                <CardTitle>{restaurant.restaurantName}</CardTitle>
                                                <CardDescription>
                                                    <div className="flex gap-1 items-center">
                                                        <MapPin size={16} />
                                                        <p className="font-bold">{restaurant.city}, {restaurant.country}</p>
                                                    </div>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardAction className="flex flex-wrap gap-2 px-3">
                                                {restaurant.cuisines?.map((cuisine: string, idx: number) => (
                                                    <Badge key={idx} variant="outline" className="capitalize">{cuisine}</Badge>
                                                ))}
                                            </CardAction>
                                            <CardFooter>
                                                <Link to={`/restaurant/${restaurant._id}`} className="w-full">
                                                    <Button className="w-full px-5 py-5" size="lg">View Menu</Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    ))
                                )
                            }

                        </div>
                        {searchedRestaurant?.data?.length === 0 && !loading && (
                            <div className="text-center py-10 pr-0 lg:pr-10 space-y-2">
                                <h3 className="text-xl font-semibold">No restaurants found!</h3>
                                <p className="text-muted-foreground">Try searching with a different name or city.</p>
                                <Button className="px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                    <Link to="/">
                                        Go Home
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage


