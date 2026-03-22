import { Button } from "@/components/ui/button"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { LockKeyhole, Mail, Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "@/components/Logo"

function Signin() {
    const [showPassword, setShowPassword] = useState(false)
    const loading = false;
    return (
        <div className="container mx-auto px-6">
            <div className="py-10 md:py-6">
                <Logo />
            </div>
            <form className="flex items-center justify-center" >
                <div className="border border-neutral-200 dark:border-neutral-600 px-10 py-12 space-y-4 min-w-70 md:min-w-100 xl:min-w-120 rounded-xl">
                    <div className="text-center space-y-5 tracking-wide xl:tracking-wider">
                        <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold">Sign in</h3>
                        <p className="pb-4 text-sm md:text-base text-muted-foreground">Please login with email and password.</p>
                    </div>
                    <InputWithIcon
                        leftIcon={Mail}
                        type="email"
                        placeholder="Email"
                        value=""
                        required
                    />
                    {/* Password Input with both Icons */}
                    <InputWithIcon
                        leftIcon={LockKeyhole}
                        rightIcon={showPassword ? Eye : EyeOff}
                        onRightIconClick={() => setShowPassword(!showPassword)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                    />

                    <div className="text-right text-xs lg:text-sm text-muted-foreground">
                        <a href="#" className="hover:underline">Forget password?</a>
                    </div>
                    <div className="w-full">
                        {
                            loading ?
                                <div className="flex items-center justify-center h-9 py-5 cursor-not-allowed rounded-xl bg-primary text-primary-foreground"><Loader2 className="animate-spin"></Loader2> </div> : <Button className="w-full py-5 text-base lg:text-base" size="lg">
                                    Sign in
                                </Button>
                        }
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                        <p className="text-xs lg:text-sm text-muted-foreground">Don't have an account? </p>
                        <Link to="/signup" className="font-medium text-sm xl:text-base hover:underline">
                            Sign up
                        </Link>
                    </div>

                </div>
            </form >
        </div>
    )
}

export default Signin