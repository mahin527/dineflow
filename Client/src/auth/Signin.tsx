import { Button } from "@/components/ui/button"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { LockKeyhole, Mail, Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "@/components/Logo"
import { useForm } from "@/hooks/useForm"
import { userSigninSchema } from "@/schema/userSchema";

function Signin() {
    const [showPassword, setShowPassword] = useState(false)
    const loading: boolean = false;

    const { input, handleInputChange } = useForm({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<any>({})

    const loginSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = userSigninSchema.safeParse(input);

        if (!result.success) {
            setErrors(result.error.format());
            return;
        }

        setErrors({});
        console.log("Valid Data:", result.data);

    }

    return (

        <div className="@container mx-auto px-6">
            <div className="py-10 md:py-6">
                <Logo />
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
                    {errors.email?._errors?.[0] && (
                        <p className="text-red-500 text-xs md:text-sm">
                            {errors.email._errors[0]}
                        </p>
                    )}

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
                    {errors.password?._errors?.[0] && (
                        <p className="text-red-500 text-xs md:text-sm">
                            {errors.password._errors[0]}
                        </p>
                    )}

                    <div className="text-right text-xs lg:text-sm">
                        <Link to="/forgot-password" className="text-muted-foreground hover:text-foreground hover:underline transition-colors">
                            Forget password?
                        </Link>
                    </div>

                    <div className="w-full">
                        {loading ? (
                            <Button disabled className="w-full py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                <Loader2 className="animate-spin mr-2" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                Sign in
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-2">
                        <p className="text-xs lg:text-sm text-muted-foreground">Don't have an account?</p>
                        <Link to="/register" className="font-semibold text-sm hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signin

