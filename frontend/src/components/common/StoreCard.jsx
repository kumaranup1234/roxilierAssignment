import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteStore } from "@/services/admin.js";
import toast from "react-hot-toast";
import StoreDialog from "../admin/StoreDialog";
import emailIcon from "../../assets/email.svg"
import addressIcon from "../../assets/address.svg"
import ratingIcon from "../../assets/rating.svg"

const StoreCard = ({ store, refresh }) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this store?")) return;
        try {
            await deleteStore(store.id);
            toast.success("Store deleted successfully");
            refresh();
        } catch (error) {
            toast.error("Failed to delete store");
        }
    };

    return (
        <div className="border border-gray-200 h-auto lg:w-80 p-6 rounded-2xl bg-white shadow-lg">
            <h1 className="font-bold text-xl mt-4 dark:text-white">{store.name}</h1>

            <div className="flex items-center space-x-2 mt-4 dark:text-white">
                <img src={addressIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Address:</p>
                    <p className="text-sm font-semibold">{store.address}</p>
                </div>
            </div>

            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={emailIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Owner Email:</p>
                    <p className="text-sm font-semibold">{store.ownerEmail}</p>
                </div>
            </div>

            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={ratingIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Average Rating:</p>
                    <p className="text-sm font-semibold">{store.averageRating}</p>
                </div>
            </div>

            <div className="flex space-x-4 mt-6 dark:text-white">
                <button
                    onClick={() => setShowDialog(true)}
                    className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:bg-blue-600 flex items-center space-x-2"
                >
                    <Pencil className="h-4 w-4" />
                    <span>Edit Store</span>
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:bg-red-600 flex items-center space-x-2"
                >
                    <Trash2 className="h-3 w-3" />
                    <span>Delete Store</span>
                </button>
            </div>

            {showDialog && (
                <StoreDialog
                    mode="edit"
                    store={store}
                    open={showDialog}
                    setOpen={setShowDialog}
                    refresh={refresh}
                />
            )}
        </div>
    );
};

export default StoreCard;
