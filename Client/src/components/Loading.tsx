import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-neutral-300 via-bg-lightGreen to-neutral-900 flex items-center justify-center relative overflow-hidden">
            <Loader className="animate-spin w-16 h-16 text-white" />
            <h2 className="text-xl md:text-2xl xl:text-3xl pt-3 font-bold">
                Waking up the server... Hang tight, good food is on the way!
            </h2>
        </div>
    );
};

export default Loading;