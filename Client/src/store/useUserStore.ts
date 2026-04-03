import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = `http://localhost:8000/api/v1/user`;
axios.defaults.withCredentials = true;

interface UserState {
    user: any;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: any) => Promise<void>;
    signin: (input: any) => Promise<void>;
    verifyEmail: (verificationToken: string) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    signout: () => Promise<void>;
    forgetPassword: () => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (input: any) => Promise<void>;
}

export const useUserStore = create<UserState>()(
    persist((set) => ({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: true,
        loading: false,

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
                        user: response.data.user,
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
                const response = await axios.post(`${API_END_POINT}/signin`, input, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Signin successful!");
                    set({
                        loading: false,
                        user: response.data.user,
                        isAuthenticated: true
                    });
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

        verifyEmail: async (verificationToken) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationToken }, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Email verification successful!");
                    set({
                        loading: false,
                        user: response.data.user,
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
                        user: response.data.user,
                        isAuthenticated: true,
                        isCheckingAuth: false // সফল হলে ফলস
                    });
                }
            } catch (error) {
                // ৪০১ এরর মানে ইউজার লগইন নেই, এটা কোনো ক্রাশ না। 
                // তাই এখানেও isCheckingAuth এবং loading কে false করতে হবে।
                set({
                    user: null,
                    isAuthenticated: false,
                    isCheckingAuth: false, // এটিই তোমাকে লোডিং থেকে মুক্তি দিবে
                    loading: false // বাটন এনাবল করার জন্য
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

        forgetPassword: async () => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/forget-password`, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message);
                    set({
                        loading: false,
                        user: response.data.user,
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
                    { password: newPassword }, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message);
                    set({
                        loading: false,
                        user: response.data.user,
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

        updateProfile: async (input) => {
            try {
                set({ loading: true });
                const response = await axios.patch(`${API_END_POINT}/profile/update-profile`, input, {
                    headers: { "Content-Type": "application/json" }
                });

                if (response.data.success) {
                    toast.success(response.data.message || "Profile update successful!");
                    set({
                        loading: false,
                        user: response.data.user,
                        isAuthenticated: true
                    });
                }
            } catch (error: any) {
                // error handling
                const errorMessage = error.response?.data?.message || "Profile update failed!";
                toast.error(errorMessage);
                set({ loading: false });
                console.error("Profile update Error:", error);
                throw error;
            }
        },
    }), {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
    })
);

