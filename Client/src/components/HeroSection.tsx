import { Loader2, Search } from "lucide-react";
import { InputWithIcon } from "./ui/input-with-icon";
import { useState } from "react";
import { Button } from "./ui/button";
import HeroImg from "@/assets/hero-img.png"
import { useNavigate } from "react-router-dom";

function HeroSection() {
    const [searchText, setSearchText] = useState<string>("")
    const loading: boolean = false;
    const navigate = useNavigate()
    return (
        <div className="@container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-5 md:gap-10">
                <div className="space-y-5 basis-full md:basis-3/5">
                    <div className="space-y-3 md:space-y-5">
                        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wider">
                            Delicious Moments, Delivered Fast.
                        </h1>
                        <p className="text-sm md:text-base xl:text-lg tracking-widest">
                            From cravings to checkout in seconds. Discover a smarter way to order food with DineFlow’s modern restaurant experience.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <InputWithIcon
                            name="search"
                            leftIcon={Search}
                            type="search"
                            placeholder="Search restaurant by name, city or country... "
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            required
                        />
                        <div>
                            {loading ? (
                                <Button disabled className="w-full px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                    <Loader2 className="animate-spin mr-2" /> Please wait...
                                </Button>
                            ) : (
                                <Button type="submit" onClick={()=> navigate(`/search/${searchText}`)} className="w-full px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                    Search
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="basis-full md:basis-2/5">
                    <img src={HeroImg} alt="hero image" className="object-cover md:w-full w-60 sm:w-80" />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;