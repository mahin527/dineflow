import HeroSection from "@/components/HeroSection";
import AllRestaurants from "@/components/AllRestaurants";

function Home() {
    return (
        <div>
            <HeroSection />

            <section className="bg-gray-50 dark:bg-neutral-900 py-10">
                <AllRestaurants />
            </section>
        </div>
    );
}

export default Home;