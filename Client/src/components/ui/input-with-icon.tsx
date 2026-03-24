import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface InputWithIconProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    onRightIconClick?: () => void;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
    ({ className, leftIcon: LeftIcon, rightIcon: RightIcon, onRightIconClick, ...props }, ref) => {
        return (
            <div className="relative flex items-center w-full">
                {/* Left Icon */}
                {LeftIcon && (
                    <LeftIcon
                        className="absolute left-3 text-muted-foreground size-5 pointer-events-none"
                    />
                )}

                <Input
                    {...props}
                    ref={ref}
                    className={cn(
                        "py-5 text-sm md:text-base 2xl:text-md",
                        LeftIcon && "pl-10", 
                        RightIcon && "pr-10", 
                        className
                    )}
                />

                {/* Right Icon (Button/Div) */}
                {RightIcon && (
                    <button
                        type="button"
                        onClick={onRightIconClick}
                        className={cn(
                            "absolute right-3 text-muted-foreground hover:text-foreground transition-colors",
                            !onRightIconClick && "pointer-events-none" // Click handle na thakle pointer interaction off
                        )}
                    >
                        <RightIcon className="size-5" />
                    </button>
                )}
            </div>
        )
    }
)
InputWithIcon.displayName = "InputWithIcon"

export { InputWithIcon }