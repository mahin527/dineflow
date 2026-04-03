import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore"
import { useNavigate } from "react-router-dom"

function VerifyEmail() {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const { verifyEmail, loading } = useUserStore()

    const handleChange = (index: number, value: string) => {
        // শুধু লেটার এবং নাম্বার এলাউ করবে
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // ভ্যালু ইনপুট হলে পরের ঘরে যাবে
            if (value !== "" && index < otp.length - 1) {
                inputRef.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                // যদি বর্তমান ঘর খালি থাকে, তবে আগের ঘরে গিয়ে ফোকাস করবে
                inputRef.current[index - 1]?.focus();
            } else {
                // বর্তমান ঘরে ডাটা থাকলে সেটা মুছে দিবে (স্মুথ এক্সপেরিয়েন্স)
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };
    const navigate = useNavigate();

    // const verifyEmailSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     try {
    //         await verifyEmail(otp);
    //         navigate("/");

    //     } catch (error) {
    //         console.error(error);
    //         // toast.error(error);
    //         console.error("Email verification failed!");
    //     }

    // }

    const verifyEmailSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // অ্যারে থেকে স্ট্রিং এ রূপান্তর: ["1","2"...] -> "123..."
        const otpString = otp.join("");

        if (otpString.length < 6) {
            toast.error("Please enter the full 6-digit code.");
            return;
        }

        try {
            // স্ট্রিং হিসেবে ওটিপি পাঠাও
            await verifyEmail(otpString);
            navigate("/");
            toast.success("Email verified successfully!");
        } catch (error: any) {
            // স্টোর থেকে অলরেডি টোস্ট হচ্ছে, এখানে শুধু লগ রাখতে পারো
            console.error("Verification failed");
        }
    };

    return (
        <div className="@container mx-auto px-6">
            <div className="py-10 md:py-6">
                <Logo />
            </div>
            <form onSubmit={verifyEmailSubmitHandler} className="flex items-center justify-center pb-10" >
                <div className="border border-neutral-200 dark:border-neutral-600 px-10 py-10 space-y-4 min-w-70 md:min-w-100 xl:min-w-120 rounded-xl">
                    <div className="text-center space-y-5 tracking-wide xl:tracking-wider">
                        <h3 className="text-2xl md:text-3xl xl:text-4xl font-bold">Verify Email</h3>
                        <p className="pb-4 text-sm md:text-base text-muted-foreground">Please verify your email.</p>
                        <p className="pb-4 text-xs md:text-sm xl:text-base text-muted-foreground">Enter the 6 digit code sent to your email address.</p>

                    </div>

                    <div className="flex items-center justify-center gap-2 md:gap-3 xl:gap-5">
                        {
                            otp.map((letter: string, index: number) => (
                                <Input
                                    type="text"
                                    ref={(element) => {
                                        inputRef.current[index] = element;
                                    }}
                                    key={index}
                                    value={letter}
                                    maxLength={1}
                                    minLength={1}
                                    className="size-10 md:size-12 lg:size-14 2xl:size-16 text-center font-black text-base md:text-lg xl:text-xl 2xl:text-2xl"
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))
                        }
                    </div>

                    <div className="w-full">
                        {loading ? (
                            <Button disabled className="w-full py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                <Loader2 className="animate-spin mr-2" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                Verify Email
                            </Button>
                        )}
                    </div>

                </div>
            </form>
        </div>
    )
}

export default VerifyEmail