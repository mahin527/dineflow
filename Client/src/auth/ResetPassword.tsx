import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { useForm } from "@/hooks/useForm";
import { LockKeyhole, Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { resetPasswordSchema } from "@/schema/userSchema";
import { ModeToggle } from '../components/ModeToggle'
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";
import { useParams } from "react-router-dom"

function ResetPassword() {
    const [showNewPassword, setShowNewPassword] = useState(false)

    const {loading, resetPassword} = useUserStore();

    const { input, handleInputChange } = useForm({
        newPassword: ""
    });

    const resetPasswordSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = resetPasswordSchema.safeParse(input);
        const params = useParams()
        const token  = params?.token || ""
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            const firstErrorKey = Object.keys(fieldErrors)[0] as keyof typeof fieldErrors;
            const errorMessage = fieldErrors[firstErrorKey]?.[0];

            if (errorMessage) {
                toast.error(errorMessage);
            }
            return;
        }

        try {
            resetPassword(token,input.newPassword )
        } catch (error) {
            console.log(error);
            
        }

        console.log(input.newPassword);
        console.log(token);
        
    }

    return (

        <div className="@container mx-auto px-6">
            <div className="py-10 md:py-6 flex items-center justify-between">
                <Logo />
                <div>
                    <ModeToggle />
                </div>
            </div>
            <form onSubmit={resetPasswordSubmitHandler} className="flex items-center justify-center pb-10" >
                <div className="border border-neutral-200 dark:border-neutral-600 px-10 py-10 space-y-4 min-w-70 md:min-w-100 xl:min-w-120 rounded-xl">
                    <div className="text-center space-y-5 tracking-wide xl:tracking-wider">
                        <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold">Reset password</h3>
                        <p className="pb-4 text-sm md:text-base text-muted-foreground">Please enter your old and new password.</p>
                    </div>

                    <InputWithIcon
                        name="newPassword"
                        leftIcon={LockKeyhole}
                        rightIcon={showNewPassword ? Eye : EyeOff}
                        onRightIconClick={() => setShowNewPassword(!showNewPassword)}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="New password"
                        value={input.newPassword}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="w-full">
                        {loading ? (
                            <Button disabled className="bg-orange-600 w-full py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                <Loader2 className="animate-spin mr-2" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-5 bg-orange-600 bg:text-orange-700 text-white rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                Reset Password
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword