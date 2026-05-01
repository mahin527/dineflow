import Logo from "./Logo"
import type { IconType } from "react-icons";
import { FaFacebookF } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { Label } from "@/components/ui/label"
import { Mail, Send } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface IconItem {
    id: number
    icon: IconType
    link: string
}

interface FoodMenuLinksItems {
    id: number
    title: string
    link: string
}

interface PopularRestaurantsItems {
    id: number
    title: string
    link: string
}

function Footer() {
    const icons: IconItem[] = [
        { id: 1, icon: FaFacebookF, link: "/" },
        { id: 2, icon: FiGithub, link: "/" },
        { id: 3, icon: FaLinkedinIn, link: "/" },
        { id: 4, icon: FaInstagram, link: "/" }
    ]

    const foodMenuLinks: FoodMenuLinksItems[] = [
        { id: 1, title: "White Castle", link: "/" },
        { id: 2, title: "Beef Sandwich", link: "/" },
        { id: 3, title: "Cherry Limeade", link: "/" },
        { id: 4, title: "Wendy's Frosty", link: "/" },
        { id: 5, title: "Pumpkin Spice", link: "/" }

    ]

    const popularRestaurants: PopularRestaurantsItems[] = [
        { id: 1, title: "Domino's Pizza", link: "/" },
        { id: 2, title: "Mcdonald's", link: "/" },
        { id: 3, title: "Pizza Hut", link: "/" },
        { id: 4, title: "Thai Spices", link: "/" },
        { id: 5, title: "Delish", link: "/" }

    ]

    return (
        <div className="footer @container mx-auto px-5 bg-neutral-900 text-white">
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-6 py-10 lg:py-18">
                <div className="space-y-3">
                    <div className="border-b border-neutral-700 flex items-center justify-center pb-5">
                        <Logo classes="w-36 lg:w-46 xl:w-48 heigh-fit px-2" />
                    </div>
                    <div className="py-4">
                        <p className="text-sm md:text-base xl:text-lg tracking-wider lg:tracking-widest">
                            1234, Los Angeles, California, USA.
                        </p>
                    </div>
                    <div className="flex items-center gap-6 justify-center">
                        {
                            icons.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link key={item.id} to={item.link} className="border p-3 2xl:p-5 rounded-full hover:scale-110 transition-transform duration-200">
                                        <Icon size={24} />
                                    </Link>
                                );
                            })
                        }

                    </div>
                </div>

                <div className="pt-6">
                    <div>
                        <h4 className="text-xl font-bold pb-5">Food Menu</h4>
                    </div>
                    <div>
                        <ul className="space-y-2 tracking-wider text-sm lg:text-base">
                            {
                                foodMenuLinks.map((item) => {
                                    return (
                                        <li key={item.id} >
                                            <Link to={item.link} className="hover:text-orange-300 transition-colors duration-200 font-medium">
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="pt-6">
                    <div>
                        <h4 className="text-xl font-bold pb-5">Popular Restaurants</h4>
                    </div>
                    <div>
                        <ul className="space-y-2 tracking-wider text-sm lg:text-base">
                            {
                                popularRestaurants.map((item) => {
                                    return (
                                        <li key={item.id} >
                                            <Link to={item.link} className="hover:text-orange-300 transition-colors duration-200 font-medium">
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="pt-6">
                    <div className="space-y-2">
                        <h4 className="text-xl font-bold">Newsletter</h4>
                        <p className="tracking-wider text-sm lg:text-base font-medium">
                            Subscribe us & receive our offers and updates your inbox directly
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 py-6">
                        <Label htmlFor="title" className="sr-only">Title</Label>
                        <InputWithIcon
                            name="menuTitle"
                            id="title"
                            leftIcon={Mail}
                            type="text"
                            placeholder="Enter Email Address "
                            // value={input.menuTitle}
                            // onChange={handleInputChange}
                            required
                        />
                        <Button className="size-10! 2xl:size-14! p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-xs md:text-sm xl:text-base" size="lg">
                            <Send size={40} />
                        </Button>
                    </div>
                </div>

            </div>
            <div className='border-t border-neutral-700'>
                <div className='flex flex-col sm:flex-row gap-y-4 items-center justify-between py-8 text-sm md:text-base tracking-wider font-medium'>
                    <p className='order-2 sm:order-1'>© 2026 DineFlow. All rights reserved.</p>
                    <ul className='flex gap-4 order-1 sm:order-2'>
                        <li>
                            <Link to={"/"}>
                                Terms of Services
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"}>
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer