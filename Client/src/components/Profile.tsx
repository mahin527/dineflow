import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import type React from 'react'
import { useState } from 'react'
import { Input } from './ui/input'

function Profile() {
    // type profileDataState = {
    //     fullname: string,
    //     email: string,
    //     contact: string,
    //     address: string,
    //     city: string,
    //     country: string,
    //     profilePic: string
    // }

    const [profileData, setProfileData] = useState(
        {
            fullname: "",
            email: "",
            contact: "",
            address: "",
            city: "",
            country: "",
            profilePic: ""
        }
    )
    const [selectedProfilePic, setSelectedProfilePic] = useState<string>("")
    const fileChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setSelectedProfilePic(result)

            }
        }
        console.log(file)

    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfileData({ ...profileData, [name]: value })
    }

    return (
        <div className="container mx-auto px-6">
            <form className="flex items-center h-screen">
                {/* Main Wrapper: Flex use kore Avatar ar Input ke pasapashi ana hoyeche */}
                <div className="flex items-center gap-6">

                    {/* 1. Avatar Section with Hover Overlay */}
                    <div className="group relative size-20 md:size-26 shrink-0">
                        <Avatar className="size-full border">
                            <AvatarImage src="https://raw.githubusercontent.com/shadcn-ui/ui/refs/heads/main/apps/v4/public/avatars/02.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        {/* Plus Icon Overlay: Eta shudhu Avatar er uporei thakbe */}
                        <label
                            htmlFor="avatar-upload"
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 text-white rounded-full cursor-pointer"
                        >
                            <Plus className="size-8" />
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={fileChageHandler}
                            />
                        </label>
                    </div>

                    {/* 2. Input Section: Eta Avatar er thik pashe boshbe */}
                    <div className="flex flex-col gap-2">
                        {/* <label className="text-sm font-medium">Username</label> */}
                        <Input
                            type="text"
                            className="font-bold outline-none border-none focus-visible:ring-transparent text-base lg:text-xl"
                            name={profileData.fullname}
                            onChange={changeHandler}
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Profile