import { Mail, Plus, Phone, LocationEdit, MapPinHouse, MapPinned, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import type React from 'react'
import { useState, type FormEvent } from 'react'
import { Input } from './ui/input'
import { InputWithIcon } from './ui/input-with-icon'
import { Button } from './ui/button'

function Profile() {
    const loading: boolean = false;

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
                setProfileData((prevData) => ({
                    ...prevData,
                    profilePic: result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(profileData);

    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    }

    return (
        <div className="container mx-auto px-6 py-3">
            <form onSubmit={updateProfileHandler} className='py-6 md:py-10'>
                <div className="space-y-5">

                    <div className="flex items-center gap-6">
                        {/* Avatar Section with Hover Overlay */}
                        <div className="group relative size-20 md:size-26 shrink-0">
                            <Avatar className="size-full border">
                                <AvatarImage src={selectedProfilePic}/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

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

                        <div className="flex flex-col gap-2">
                            <Input
                                type="text"
                                className="font-black outline-none border-none focus-visible:ring-transparent text-base lg:text-xl"
                                name="fullname"
                                value={profileData.fullname}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    {/* Profile data */}
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
                        <div>
                            <InputWithIcon
                                name="email"
                                leftIcon={Mail}
                                type="email"
                                value={profileData.email}
                                onChange={changeHandler}
                                className="font-bold outline-none border-none focus-visible:ring-transparent"
                                required
                            />
                        </div>

                        <div>
                            <InputWithIcon
                                name="contact"
                                leftIcon={Phone}
                                type="number"
                                value={profileData.contact}
                                onChange={changeHandler}
                                className="font-bold outline-none border-none focus-visible:ring-transparent"
                                required
                            />
                        </div>

                        <div>
                            <InputWithIcon
                                name="address"
                                leftIcon={MapPinHouse}
                                type="text"
                                value={profileData.address}
                                onChange={changeHandler}
                                className="font-bold outline-none border-none focus-visible:ring-transparent"
                                required
                            />
                        </div>

                        <div>
                            <InputWithIcon
                                name="city"
                                leftIcon={MapPinned}
                                type="text"
                                value={profileData.city}
                                onChange={changeHandler}
                                className="font-bold outline-none border-none focus-visible:ring-transparent"
                                required
                            />
                        </div>

                        <div>
                            <InputWithIcon
                                name="country"
                                leftIcon={LocationEdit}
                                type="text"
                                value={profileData.country}
                                onChange={changeHandler}
                                className="font-bold outline-none border-none focus-visible:ring-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        {loading ? (
                            <Button disabled className="px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base">
                                <Loader2 className="animate-spin mr-2" /> Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="px-5 py-5 rounded-xl text-xs md:text-sm xl:text-base" size="lg">
                                Update Data
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile