import { useEffect } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "./ui/button";
import SearcPageSkeleton from "@/components/SearcPageSkeleton"

const AllRestaurants = () => {
    const { getAllRestaurants, allRestaurants, loading } = useRestaurantStore();

    useEffect(() => {
        getAllRestaurants();
    }, []);

    if (loading) return <div className="text-center py-20 font-bold text-base lg:text-xl xl:text-2xl">Loading Restaurants...</div>;

    return (
        <>
            {
                loading ? <SearcPageSkeleton /> : (
                    <div className="max-w-7xl mx-auto px-4 py-10">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Explore All Restaurants</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {allRestaurants.map((res: any) => (
                                <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    {/* <Link to={`/restaurant/${res._id}`} key={res._id}> */}
                                    <img src={res.restaurantPicture} alt={res.restaurantName} className="w-full h-48 object-cover" />
                                    <CardHeader className="py-3">
                                        <div className="flex justify-between items-center">
                                            <CardTitle className="text-xl font-bold">{res.restaurantName.toUpperCase()}</CardTitle>
                                            <Badge variant="outline" className="text-orange-600 border-orange-600">{res.cuisines[0]}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <MapPin size={16} className="mr-1" />
                                            <span>{res.city}, {res.country}</span>
                                        </div>
                                    </CardContent>
                                    {/* </Link> */}
                                    <CardFooter>
                                        <Link to={`/restaurant/${res._id}`} className="w-full">
                                            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl" size="lg">View Menu</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                )

            }

        </>
    );
};

export default AllRestaurants