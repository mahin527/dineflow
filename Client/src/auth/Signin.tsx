import { Button } from "@/components/ui/button"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { LockKeyhole, Mail, Eye, EyeOff, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Logo from "@/components/Logo"
import { useForm } from "@/hooks/useForm"
import { userSigninSchema } from "@/schema/userSchema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore"
import { ModeToggle } from '../components/ModeToggle'


function Signin() {
    const [showPassword, setShowPassword] = useState(false)
    const { signin, loading } = useUserStore()

    const { input, handleInputChange } = useForm({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const loginSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = userSigninSchema.safeParse(input);

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
            const response = await signin(input);
            // If the response is successful, navigate
            if (response) {
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error("Signin failed");
        }
    }

    useEffect(() => {
        // পেজ লোড হওয়ার সাথে সাথে ক্রেডেনশিয়াল দেখাবে
        toast.info("Test Admin Credentials", {
            description: "Email: oliver.smith@proton.com | Password: oliver",
            duration: 10000, // ১০ সেকেন্ড পর্যন্ত থাকবে
            action: {
                label: "Copy Email",
                onClick: () => navigator.clipboard.writeText("oliver.smith@proton.com")
            },
        });
    }, []);

    return (

        <div className="@container mx-auto px-6">
            <div className="py-10 md:py-6 flex items-center justify-between">
                <Logo />
                <div>
                    <ModeToggle />
                </div>
            </div>
            <form onSubmit={loginSubmitHandler} className="flex items-center justify-center pb-10" >
                <div className="border border-neutral-200 dark:border-neutral-600 px-10 py-10 space-y-4 min-w-70 md:min-w-100 xl:min-w-120 rounded-xl">
                    <div className="text-center space-y-5 tracking-wide xl:tracking-wider">
                        <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold">Sign in</h3>
                        <p className="pb-4 text-sm md:text-base text-muted-foreground">Please login with email and password.</p>
                    </div>

                    <InputWithIcon
                        name="email"
                        leftIcon={Mail}
                        type="email"
                        placeholder="Email"
                        value={input.email}
                        onChange={handleInputChange}
                        required
                    />

                    <InputWithIcon
                        name="password"
                        leftIcon={LockKeyhole}
                        rightIcon={showPassword ? Eye : EyeOff}
                        onRightIconClick={() => setShowPassword(!showPassword)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={input.password}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="text-right text-xs lg:text-sm">
                        <Link to="/forgot-password" className="text-orange-600 hover:text-orange-700 hover:underline transition-colors">
                            Forget password?
                        </Link>
                    </div>

                    <div className="w-full">
                        {loading ? (
                            <Button disabled className="bg-orange-600 w-full py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                <Loader2 className="animate-spin mr-2" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                Sign in
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-2">
                        <p className="text-xs lg:text-sm text-muted-foreground">Don't have an account?</p>
                        <Link to="/signup" className="font-semibold text-sm hover:underline text-orange-600 hover:text-orange-700">
                            Sign up
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signin

