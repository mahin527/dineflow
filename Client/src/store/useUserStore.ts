import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = `http://localhost:8000/api/v1/user`;
axios.defaults.withCredentials = true;

interface User {
    username: string;
    fullname: string;
    email: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    profilePicturePublicId: string
    isAdmin: boolean;
    isVerified: boolean;
}


interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: any) => Promise<void>;
    signin: (input: any) => Promise<any>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    signout: () => Promise<void>;
    forgetPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (formData: FormData) => Promise<void>;
}

export const useUserStore = create<UserState>()(
    persist((set) => ({
        loading: false,
        user: null,
        isAuthenticated: false,
        isCheckingAuth: true,

        signup: async (input: any) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/signup`, input, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Signup successful!");
                    set({
                        loading: false,
                        user: response.data.data,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "Signup failed!";
                toast.error(errorMessage);
                console.error("Signup Error:", error);
                throw error;
            }
        },

        signin: async (input: any) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/signin`, input);

                if (response.data.success) {
                    // ১. স্টেট আপডেট করুন
                    set({
                        user: response.data.data.user,
                        isAuthenticated: true,
                        loading: false
                    });
                    toast.success(response.data.message || "Signin successful!");
                    // ২. এটি নিশ্চিত করে যে ফাংশনটি সফলভাবে শেষ হয়েছে
                    return response.data;
                }
            } catch (error: any) {
                // error handling
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "Signin failed!";
                toast.error(errorMessage);
                console.error("Signin Error:", error);
                throw error;
            }
        },

        verifyEmail: async (verificationCode) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode });

                if (response.data.success) {
                    toast.success(response.data.message || "Email verification successful!");
                    // বর্তমান ইউজার অবজেক্ট নিয়ে তার isVerified আপডেট করো
                    const updatedUser = { ...response.data.data, isVerified: true };
                    set({
                        loading: false,
                        // user: response.data.data,
                        user: updatedUser, // আপডেট করা ইউজার সেট করো
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                set({ loading: false });
                const errorMessage = error.response?.data?.message || "Email verification failed!";
                toast.error(errorMessage);
                console.error("Email verification error:", error);
                throw error;
            }
        },

        checkAuthentication: async () => {
            try {
                set({ isCheckingAuth: true }); // চেক শুরু হলে ট্রু
                const response = await axios.get(`${API_END_POINT}/check-auth`);

                if (response.data.success) {
                    set({
                        user: response.data.data,
                        isAuthenticated: true,
                        isCheckingAuth: false // সফল হলে ফলস
                    });
                }
            } catch (error) {
                set({
                    user: null,
                    isAuthenticated: false,
                    isCheckingAuth: false,
                    // loading: false
                });
                console.log("User not authenticated (Expected on first visit)");
            }
        },

        signout: async () => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/signout`, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Signout successful!");
                    set({
                        loading: false,
                        user: null,
                        isAuthenticated: false
                    });
                }
            } catch (error: any) {
                // error handling
                const errorMessage = error.response?.data?.message || "Signout failed!";
                toast.error(errorMessage);
                set({ loading: false });
                console.error("Signout Error:", error);
                throw error;
            }
        },

        forgetPassword: async (email) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/forget-password`, { email }, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message);
                    set({
                        loading: false,
                        user: response.data.data,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                const errorMessage = error.response?.data?.message;
                toast.error(errorMessage);
                set({ loading: false });
                console.error("Forget password error:", error);
                throw error;
            }
        },

        resetPassword: async (token, newPassword) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/reset-password/${token}`,
                    { newPassword }, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message);
                    set({
                        loading: false,
                        user: response.data.data,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                const errorMessage = error.response?.data?.message;
                toast.error(errorMessage);
                set({ loading: false });
                console.error("Reset password error:", error);
                throw error;
            }
        },

        updateProfile: async (formData) => {
            try {
                const response = await axios.patch(`${API_END_POINT}/profile/update`, formData);

                if (response.data.success) {
                    toast.success(response.data.message || "Profile updated successfully!");
                    set({
                        user: response.data.data,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                const errorMessage = error.response?.data?.message || "Profile update failed!";
                toast.error(errorMessage);
                console.error("Profile update Error:", error);
                throw error;
            }
        },
    }), {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
    })
);

