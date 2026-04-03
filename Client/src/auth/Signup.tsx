import { Button } from "@/components/ui/button"
import { InputWithIcon } from "@/components/ui/input-with-icon"
import { LockKeyhole, Mail, Eye, EyeOff, Loader2, UserPen, Phone, CalendarHeart, Calendar } from "lucide-react"
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import Logo from "@/components/Logo"
import { useForm } from "@/hooks/useForm"
import { userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore"
import { Toaster } from "@/components/ui/sonner"


function Signup() {
    const { signup, loading } = useUserStore()

    const [showPassword, setShowPassword] = useState(false)
    const loading: boolean = false;

    const inputRef = useRef<HTMLInputElement>(null);

    const { input, handleInputChange } = useForm({
        username: "",
        fullname: "",
        contact: "",
        dateOfBirth: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<any>({})

    const signupSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = userSignupSchema.safeParse(input);

        if (!result.success) {
            setErrors(result.error.format());
            return;
        }

        setErrors({});
        console.log("Valid Data:", result.data);

        // login api implementation starts here
        await signup(input)


    }

    return (

        <div className="@container mx-auto px-6">
            <div className="py-10 md:py-6">
                <Logo />
            </div>
            <form onSubmit={signupSubmitHandler} className="flex items-center justify-center pb-10">
                <div className="border border-neutral-200 dark:border-neutral-600 px-10 py-10 space-y-4 min-w-70 md:min-w-100 xl:min-w-120 rounded-xl">
                    <div className="text-center space-y-5 tracking-wide xl:tracking-wider">
                        <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold">Sign up</h3>
                        <p className="pb-4 text-sm md:text-base text-muted-foreground">Complete the form to create a new account.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <InputWithIcon
                                name="username"
                                leftIcon={UserPen}
                                type="text"
                                placeholder="username"
                                value={input.username}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.username?._errors?.[0] && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.username._errors[0]}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <InputWithIcon
                                name="fullname"
                                leftIcon={UserPen}
                                type="text"
                                placeholder="fullname"
                                value={input.fullname}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.fullname?._errors?.[0] && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.fullname._errors[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <InputWithIcon
                                name="contact"
                                leftIcon={Phone}
                                type="number"
                                placeholder="Mobile"
                                value={input.contact}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.contact?._errors?.[0] && (
                                <p className="text-red-500 text-xs md:text-sm">
                                    {errors.contact._errors[0]}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col w-full">
                            <InputWithIcon
                                name="dateOfBirth"
                                leftIcon={CalendarHeart}
                                rightIcon={Calendar}
                                ref={inputRef}
                                onRightIconClick={() => inputRef.current?.showPicker()}
                                type="date"
                                min="1900-01-01"
                                max="2027-12-31"
                                placeholder="Date of Birth"
                                value={input.dateOfBirth}
                                onChange={handleInputChange}
                                required
                            />

                            {errors.dateOfBirth?._errors?.[0] && (
                                <p className="text-red-500 text-xs md:text-sm">
                                    {errors.dateOfBirth._errors[0]}
                                </p>
                            )}
                        </div>
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

                    <div className="w-full">
                        {loading ? (
                            <Button disabled className="w-full py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                <Loader2 className="animate-spin mr-2" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                Sign up
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-2">
                        <p className="text-xs lg:text-sm text-muted-foreground">Already have an account?</p>
                        <Link to="/login" className="font-semibold text-sm hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup

