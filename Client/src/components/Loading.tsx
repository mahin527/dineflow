import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-neutral-300 via-bg-lightGreen to-neutral-900 flex items-center justify-center relative overflow-hidden">
            <Loader className="animate-spin w-16 h-16 text-white" />
        </div>
    );
};

export default Loading;