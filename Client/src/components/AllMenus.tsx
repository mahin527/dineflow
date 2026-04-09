import { useEffect } from "react";
import { useMenuStore } from "@/store/useMenuStore";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SearcPageSkeleton from "@/components/SearcPageSkeleton"

const AllMenus = () => {
    const { getAllMenus, allMenus, loading } = useMenuStore();
    const { addToCart } = useCartStore();

    useEffect(() => {
        getAllMenus();
    }, []);

    return (
        <>
            {
                loading ? <SearcPageSkeleton /> : (
                    <div className="max-w-7xl mx-auto px-4 py-10">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Discover New Flavors</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {allMenus.map((menu: any) => (
                                <Card key={menu._id} className="relative group overflow-hidden rounded-2xl shadow-md">
                                    <img src={menu.menuImage} alt={menu.menuTitle} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/80 px-2 py-1 rounded-lg font-bold text-orange-600">
                                        ${menu.price}
                                    </div>

                                    <CardContent className="min-h-18">
                                        <h3 className="font-bold text-lg capitalize">{menu.menuTitle}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{menu.description || "Fresh and healthy meal."}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            onClick={() => addToCart(menu, menu.restaurantId)}
                                            className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
                                        >
                                            Add to Cart
                                        </Button>
                                        <button onClick={()=> console.log("AllMenus.tsx: ", menu)}>menuData</button>
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

export default AllMenus