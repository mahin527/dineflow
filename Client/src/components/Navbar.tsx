// import { useEffect, useState } from 'react'
import { useState } from 'react'
import { Loader2, MenuIcon, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo"
import { Link } from 'react-router-dom'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar'

import { ModeToggle } from './ModeToggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { useCartStore } from '@/store/useCartStore'

function Navbar() {
    const navClasses = 'py-3 md:py-4 w-full text-neutral-700 dark:text-white sticky top-0 left-0 right-0 z-10'
    const navContetWrapperClasses = '@container mx-auto px-6 flex justify-between items-center'
    const menuLinkClasses = `
    flex flex-col lg:flex-row items-center
    fixed lg:static top-0 bottom-0 h-screen lg:h-auto 
    px-10 bg-neutral-100 dark:bg-neutral-800 lg:bg-transparent dark:lg:bg-transparent 
    pt-24 lg:pt-0 transition-all duration-500 gap-8 
    text-sm lg:text-base xl:text-lg font-bold 
    w-64 sm:w-72 md:w-80 lg:w-auto 
    z-[-1] lg:z-auto shadow-xl lg:shadow-none
`;

    const [mobileMenu, setMobileMenu] = useState(false)
    const toggleMenu = () => {
        // setMobileMenu(!mobileMenu)
        setMobileMenu(prev => !prev)
    }

    const admin: boolean = true
    const loading: boolean = false;

    // const { cart, addToCart, incrementQuantity } = useCartStore();
    // const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        // <nav className={`${navClasses} ${sticky ? darkNav : ''}`}>
        <nav className={`${navClasses}`}>

            <div className={`${navContetWrapperClasses}`}>
                <Logo />
                <ul className={`${menuLinkClasses} ${mobileMenu ? 'right-0' : '-right-full'}`}>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders/status">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <ul className="flex flex-col lg:flex-row items-center justify-center gap-2 md:gap-3 xl:gap-4">
                            <li>
                                {
                                    admin && (
                                        <Menubar>
                                            <MenubarMenu>
                                                <MenubarTrigger className='px-3 py-2'>
                                                    Dashboard
                                                </MenubarTrigger>
                                                <MenubarContent>
                                                    <Link to="/admin/restaurant">
                                                        <MenubarItem>
                                                            Add Restaurant
                                                        </MenubarItem>
                                                    </Link>
                                                    <Link to="/admin/menu">
                                                        <MenubarItem>
                                                            Add Menu
                                                        </MenubarItem>
                                                    </Link>
                                                    <Link to="/admin/orders">
                                                        <MenubarItem>
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
                                        <ShoppingCart />
                                        <Button size={"icon"} className='absolute dark:bg-neutral-500 bg-neutral-700 text-white -inset-y-3 left-2 p-2 w-4 h-4 text-xs rounded-lg'>0</Button>
                                    </Link>
                                </div>
                            </li>
                            <li className="flex items-center justify-center gap-3 md:gap-4 py-3 md:py-0">
                                <Avatar size='lg'>
                                    <AvatarImage />
                                    <AvatarFallback>
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div>


                                    {loading ? (
                                        <Button disabled className="w-full py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                            <Loader2 className="animate-spin mr-2" /> Please wait...
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="w-full py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
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