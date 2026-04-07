import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/useCartStore";

export function QuantitySelector({ quantity, menuId }: { quantity: number, menuId: string }) {
    const { incrementQuantity, decrementQuantity } = useCartStore()
    return (
        <div className="flex items-center border border-neutral-200 dark:border-neutral-700 rounded-lg w-fit overflow-hidden">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-none h-8 w-8 hover:bg-neutral-100"
                onClick={() => decrementQuantity(menuId)}
            >
                <Minus className="size-4" />
            </Button>

            <span className="px-4 font-medium text-sm">{quantity}</span>

            <Button
                variant="ghost"
                size="icon"
                className="rounded-none h-8 w-8 hover:bg-neutral-100 border-l"
                onClick={() => incrementQuantity(menuId)}
            >
                <Plus className="size-4" />
            </Button>
        </div>
    );
}