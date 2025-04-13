import { useEffect, useState } from "react";
import { getStoreSummary, getUserRatings } from "@/services/owner.js";
import toast from "react-hot-toast";
import StoreUserRatings from "@/components/store/StoreUserRatings.jsx";
import StoreRatingSummary from "@/components/store/StoreRatingSummary.jsx";

const OwnerDashboard = () => {
    const [storeInfo, setStoreInfo] = useState(null);
    const [userRatings, setUserRatings] = useState([]);

    useEffect(() => {
        const fetchOwnerData = async () => {
            try {
                const storeData = await getStoreSummary();
                setStoreInfo(storeData);

                const ratingData = await getUserRatings();
                setUserRatings(ratingData.users);
            } catch (error) {
                toast.error("Failed to fetch owner dashboard data.");
            }
        };

        fetchOwnerData();
    }, []);

    return (
        <div className="flex justify-start p-6 max-w-7xl mx-auto space-y-4 space-x-2">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Store Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                    {storeInfo && (
                        <StoreRatingSummary
                            name={storeInfo.name}
                            address={storeInfo.address}
                            rating={storeInfo.averageRating}
                            ratingCount={storeInfo.totalRatings}
                            isShow={false}
                        />
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Users Who Rated Your Store</h2>
                {userRatings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {userRatings.map((user) => (
                            <StoreUserRatings
                                key={user.userId}
                                name={user.name}
                                rating={user.rating}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No ratings yet.</p>
                )}
            </div>
        </div>
    );
};

export default OwnerDashboard;
