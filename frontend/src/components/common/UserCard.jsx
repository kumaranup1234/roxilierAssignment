import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteUser } from "@/services/admin.js";
import EditUserDialog from "@/components/admin/EditUserDialog";
import toast from "react-hot-toast";
import emailIcon from "../../assets/email.svg"
import addressIcon from "../../assets/address.svg"
import userRoleIcon from "../../assets/user-role.svg"
import ratingIcon from "../../assets/rating.svg"

const UserCard = ({ user, refresh }) => {
    const [showEdit, setShowEdit] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteUser(user.id);
            toast.success("User deleted successfully");
            refresh();
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    return (
        <div className="border border-gray-200 h-auto lg:w-80 p-6 rounded-2xl bg-white shadow-lg">

            <h1 className="font-bold text-xl mt-4 dark:text-white">{user.name}</h1>

            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={emailIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Email::</p>
                    <p className="text-sm font-semibold">{user.email}</p>
                </div>
            </div>

            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={addressIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Address:</p>
                    <p className="text-sm font-semibold">{user.address || "-"}</p>
                </div>
            </div>

            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={userRoleIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Role:</p>
                    <p className="text-sm font-semibold">{user.role}</p>
                </div>
            </div>

            {user.role === 'store_owner' && (
                <div className="flex space-x-2 mt-4 dark:text-white">
                    <img src={ratingIcon} alt="Clock" className="h-5" />
                    <div>
                        <p className="text-sm">Average Rating:</p>
                        <p className="text-sm font-semibold">{user.store?.averageRating ?? 0.0}</p>
                    </div>
                </div>
            )}

            <div className="flex space-x-4 mt-6 dark:text-white">
                <button
                    onClick={() => setShowEdit(true)}
                    className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:bg-blue-600 flex items-center space-x-2"
                >
                    <Pencil className="h-4 w-4" />
                    <span>Edit User</span>
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:bg-red-600 flex items-center space-x-2"
                >
                    <Trash2 className="h-3 w-3" />
                    <span>Delete User</span>
                </button>
            </div>

            {showEdit && (
                <EditUserDialog
                    mode="edit"
                    user={user}
                    open={showEdit}
                    setOpen={setShowEdit}
                    refresh={refresh}
                />
            )}
        </div>
    );
};

export default UserCard;
