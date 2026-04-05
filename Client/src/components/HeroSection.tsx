import HeroImg from "@/assets/hero-img.png"
import SearchInputBlock from "./SearchInputBlock";

function HeroSection() {

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
                        <SearchInputBlock />
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