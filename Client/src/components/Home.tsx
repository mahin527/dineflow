import HeroSection from "@/components/HeroSection";
import AllRestaurants from "@/components/AllRestaurants";
import AllMenus from "@/components/AllMenus";

function Home() {
    return (
        <div>
            <HeroSection />

            <section className="bg-gray-50 dark:bg-neutral-900 py-10">
                <AllRestaurants />
            </section>

            <section className="py-10">
                <AllMenus />
            </section>
        </div>
    );
}

export default Home;