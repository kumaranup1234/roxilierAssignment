import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PasswordInput from "../../components/common/PasswordInput";
import { updatePassword } from "@/services/user";
import { useAuth } from "@/context/AuthContext";

const ResetPassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    const { auth } = useAuth();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            toast.error("Please fill both fields.");
            return;
        }

        const toastId = toast.loading("Updating password...");
        try {
            await updatePassword(oldPassword, newPassword);
            toast.dismiss(toastId);
            toast.success("Password updated successfully!");
            auth.logout();
            navigate("/login");
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(
                error.response?.data?.message || "Failed to update password"
            );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="w-full max-w-md rounded-lg bg-white px-7 py-10 shadow-lg">
                    <form onSubmit={handleChangePassword}>
                        <h4 className="text-2xl font-semibold mb-7 text-gray-800 text-center">
                            Change Password
                        </h4>

                        <PasswordInput
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />

                        <PasswordInput
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="w-full text-sm bg-teal-900 text-white py-2 mt-4 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
