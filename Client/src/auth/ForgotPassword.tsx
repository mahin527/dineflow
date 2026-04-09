import { Button } from "@/components/ui/button"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { Mail, Loader2 } from "lucide-react"
import { useForm } from "@/hooks/useForm"
import { Link } from "react-router-dom"
import Logo from "@/components/Logo"
import { forgetPasswordSchema } from "@/schema/userSchema";
import { ModeToggle } from '../components/ModeToggle'
import { useUserStore } from "@/store/useUserStore"
import { toast } from "sonner";

function ForgotPassword() {
    const { loading, forgetPassword } = useUserStore()

    const { input, handleInputChange } = useForm({
        email: ""
    });

    const forgetPasswordSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = forgetPasswordSchema.safeParse(input);


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
            forgetPassword(input.email)
        } catch (error) {
            console.log(error);

        }

        console.log("Valid Data:", result.data);

    }

    return (
        <div className="@container mx-auto px-6">
            <div className="py-10 md:py-6 flex items-center justify-between">
                <Logo />
                <div>
                    <ModeToggle />
                </div>
            </div>
            <form onSubmit={forgetPasswordSubmitHandler} className="flex items-center justify-center pb-10" >
                <div className="border border-neutral-200 dark:border-neutral-600 px-10 py-10 space-y-4 min-w-70 md:min-w-100 xl:min-w-120 rounded-xl">
                    <div className="text-center space-y-5 tracking-wide xl:tracking-wider">
                        <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold">Forget password</h3>
                        <p className="pb-4 text-sm md:text-base text-muted-foreground">Please enter your email to reset your password.</p>
                    </div>

                    <InputWithIcon
                        name="email"
                        leftIcon={Mail}
                        type="email"
                        placeholder="Enter your email"
                        value={input.email}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="w-full">
                        {loading ? (
                            <Button disabled className="bg-orange-600 w-full py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                <Loader2 className="animate-spin mr-2" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-5 rounded-xl text-xs md:text-sm xl:text-base bg-orange-600 hover:bg-orange-700 text-white" size="lg">
                                Send Reset Link
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-2">
                        <p className="text-xs lg:text-sm text-muted-foreground">Remember password?</p>
                        <Link to="/signin" className="font-semibold text-sm hover:underline text-orange-600 hover:text-orange-700">
                            Sign in
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword