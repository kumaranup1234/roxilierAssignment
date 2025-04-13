import { getAllReviews } from "@/services/admin.js";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const AllRatings = () => {
    const [ratings, setRatings] = useState([]);

    const fetchRatings = async () => {
        try {
            const data = await getAllReviews();
            setRatings(data);
        } catch (err) {
            console.error("Error fetching store ratings:", err);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold text-center p-4">Manage Stores</h1>
            <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {ratings.map((store) => (
                    <div key={store.storeId} className="border border-gray-200 rounded-2xl bg-white shadow-md p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">{store.storeName}</h2>
                        <p className="text-sm text-gray-500 mb-4">{store.storeAddress}</p>

                        {store.rating.length > 0 ? (
                            <div className="space-y-4 overflow-y-auto max-h-80 pr-2">
                                {store.rating.map((user) => (
                                    <div
                                        key={user.userId}
                                        className="bg-gray-50 p-3 rounded-md border border-gray-100 shadow-sm"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                {[...Array(user.rating)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No user ratings yet.</p>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default AllRatings;
