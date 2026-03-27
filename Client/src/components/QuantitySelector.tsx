import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";

export function QuantitySelector() {
    return (
        <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg w-fit overflow-hidden">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-none h-8 w-8 hover:bg-neutral-100"
            >
                <Minus className="size-4" />
            </Button>

            <span className="px-4 font-medium text-sm">1</span>

            <Button
                variant="ghost"
                size="icon"
                className="rounded-none h-8 w-8 hover:bg-neutral-100 border-l"
            >
                <Plus className="size-4" />
            </Button>
        </div>
    );
}