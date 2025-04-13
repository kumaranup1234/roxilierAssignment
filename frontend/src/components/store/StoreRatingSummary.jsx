import { useState } from "react";
import { Star } from "lucide-react";
import { submitRating } from "@/services/user";
import { useAuth } from "@/context/AuthContext";
import image from "../../assets/placeholder.svg";
import toast from "react-hot-toast";
import addressIcon from "../../assets/address.svg"
import ratingIcon from "../../assets/rating.svg"
import storeIcon from "../../assets/store.png"

const StoreRatingSummary = ({
                                storeId,
                                name,
                                address,
                                rating,
                                ratingCount,
                                userRating,
                                refreshStores,
                                isShow
                            }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(userRating || 0);
    const { auth } = useAuth();

    const handleRate = async (newRating) => {
        try {
            const toastId = toast.loading("Submitting your rating...");
            setSelectedRating(newRating);
            await submitRating({ rating: newRating, storeId });
            toast.dismiss(toastId);
            toast.success("Your rating was submitted.");
            refreshStores?.();
        } catch (error) {
            toast.error("Error submitting rating");
            console.error("Error submitting rating:", error);
        }
    };

    const renderStars = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            const filled = hoverRating >= i || (!hoverRating && selectedRating >= i);
            stars.push(
                <button
                    key={i}
                    onClick={() => handleRate(i)}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                >
                    <Star
                        className={`h-5 w-5 transition ${
                            filled ? "fill-amber-400 text-amber-400" : "text-gray-400"
                        }`}
                    />
                </button>
            );
        }

        return stars;
    };

    return (
        <div className="border border-gray-200 h-auto lg:w-80 p-4 rounded-2xl bg-white shadow-lg">
            <div className="relative h-48 w-full overflow-hidden rounded-md">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                />
                <span className="absolute right-2 top-2 bg-white/90 text-black text-sm font-semibold px-3 py-1 rounded-full shadow">
          {(Number(rating) || 0).toFixed(1)} ({ratingCount})
        </span>
            </div>
            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={storeIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Store Name:</p>
                    <h1 className="font-bold text-xl mt-4 text-gray-900">{name}</h1>
                </div>
            </div>
            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={addressIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Address:</p>
                    <p className="text-sm text-gray-600 mt-1">{address}</p>
                </div>
            </div>


            {isShow && <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={ratingIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Rating:</p>
                    <div className="flex items-center gap-1 mt-4">{renderStars()}</div>
                </div>
            </div>}
        </div>
    );
};

export default StoreRatingSummary;
