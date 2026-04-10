import { useEffect, useState } from 'react'
import { Loader2, MenuIcon, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"
import { Link, useNavigate } from 'react-router-dom'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar'
import { ModeToggle } from './ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useUserStore } from '@/store/useUserStore'
import { useCartStore } from '@/store/useCartStore'
import { useRestaurantStore } from '@/store/useRestaurantStore'
import { useMenuStore } from '@/store/useMenuStore'
import { useOrderStore } from '@/store/useOrderStore'


function Navbar() {
    const navClasses = 'py-3 md:py-4 w-full text-neutral-700 dark:text-white sticky top-0 left-0 right-0 z-10'
    const navContetWrapperClasses = '@container mx-auto px-6 flex justify-between items-center'
    const menuLinkClasses = `flex flex-col lg:flex-row items-center
    fixed lg:static top-0 bottom-0 h-screen lg:h-auto 
    px-10 bg-neutral-100 dark:bg-neutral-800 lg:bg-transparent dark:lg:bg-transparent 
    pt-24 lg:pt-0 transition-all duration-500 gap-8 
    text-sm lg:text-base xl:text-lg font-bold 
    w-64 sm:w-72 md:w-80 lg:w-auto 
    z-20 lg:z-auto shadow-xl lg:shadow-none`;

    const [mobileMenu, setMobileMenu] = useState(false)
    const toggleMenu = () => {
        setMobileMenu(prev => !prev)
    }

    const navigate = useNavigate();
    const { user, loading, signout } = useUserStore()
    const logoutHandler = async () => {
        try {
            await signout();
            useUserStore.persist.clearStorage();
            useCartStore.persist.clearStorage();
            useRestaurantStore.persist.clearStorage();
            useMenuStore.persist.clearStorage();
            useOrderStore.persist.clearStorage();
            navigate("/signin");
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        if (mobileMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [mobileMenu]);

    const { cart } = useCartStore()
    return (
        <nav className={`${navClasses}`}>
            {
                mobileMenu && (
                    <div
                        className="fixed inset-0 bg-black/50 z-5 lg:hidden"
                        onClick={toggleMenu}
                    />
                )
            }
            <div className={`${navContetWrapperClasses}`}>
                <Logo />
                <ul className={`${menuLinkClasses} ${mobileMenu ? 'right-0' : '-right-full'}`}>
                    <li className='text-orange-500 hover:text-orange-600'>
                        <Link to="/" onClick={() => setMobileMenu(false)}>
                            Home
                        </Link>
                    </li>
                    <li className='text-orange-500 hover:text-orange-600'>
                        <Link to="/orders/status" onClick={() => setMobileMenu(false)}>
                            Orders
                        </Link>
                    </li>
                    <li>
                        <ul className="flex flex-col lg:flex-row items-center justify-center gap-2 md:gap-3 xl:gap-4">
                            <li className='text-orange-500 hover:text-orange-600'>
                                {
                                    user?.isAdmin && (
                                        <Menubar>
                                            <MenubarMenu>
                                                <MenubarTrigger className='px-3 py-2'>
                                                    Dashboard
                                                </MenubarTrigger>
                                                <MenubarContent>
                                                    <Link to="/admin/restaurant">
                                                        <MenubarItem onClick={() => setMobileMenu(false)} className='text-orange-500 hover:text-orange-600'>
                                                            Add Restaurant
                                                        </MenubarItem>
                                                    </Link>
                                                    <Link to="/admin/menu">
                                                        <MenubarItem onClick={() => setMobileMenu(false)} className='text-orange-500 hover:text-orange-600'>
                                                            Add Menu
                                                        </MenubarItem>
                                                    </Link>
                                                    <Link to="/admin/orders">
                                                        <MenubarItem onClick={() => setMobileMenu(false)} className='text-orange-500 hover:text-orange-600'>
                                                            Orders
                                                        </MenubarItem>
                                                    </Link>
                                                </MenubarContent>
                                            </MenubarMenu>
                                        </Menubar>
                                    )
                                }
                            </li>
                            <li className="flex items-center justify-center gap-3 md:gap-4 py-3 md:py-0">
                                <div>
                                    <ModeToggle />
                                </div>
                                <div>
                                    <Link to="/cart" className='relative cursor-pointer'>
                                        <ShoppingCart className='text-orange-500 hover:text-orange-600' />
                                        {
                                            cart?.length > 0 && (
                                                <Button size={"icon"} className='absolute bg-orange-500 -inset-y-3 left-2 p-2 w-4 h-4 text-xs rounded-lg'>
                                                    {cart?.length}
                                                </Button>
                                            )
                                        }

                                    </Link>
                                </div>
                            </li>
                            <li className="flex items-center justify-center gap-3 md:gap-4 py-3 md:py-0">
                                <Link to="/profile" onClick={() => setMobileMenu(false)}>
                                    <Avatar size='lg'>
                                        <AvatarImage src={user?.profilePicture} alt={user?.fullname} />
                                        <AvatarFallback>
                                            {user?.fullname?.charAt(0).toUpperCase() || "CN"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    {loading ? (
                                        <Button disabled className="bg-orange-600 w-full py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                            <Loader2 className="animate-spin mr-2" /> Please wait...
                                        </Button>
                                    ) : (
                                        <Button onClick={logoutHandler} type="submit" className="w-full py-5  bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                            Logout
                                        </Button>
                                    )}
                                </div>
                            </li>
                        </ul>

                    </li>
                </ul>

                <MenuIcon className='w-5 sm:w-6 md:w-8 lg:hidden cursor-pointer'
                    onClick={toggleMenu} />
            </div>
        </nav>
    )
}

export default Navbar