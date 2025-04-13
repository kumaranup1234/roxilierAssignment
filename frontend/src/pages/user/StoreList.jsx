import { useEffect, useState } from "react";
import { getAllStores } from "@/services/user.js";
import StoreRatingSummary from "@/components/store/StoreRatingSummary";
import toast from "react-hot-toast";

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchStores = async () => {
        try {
            const { stores } = await getAllStores();
            console.log(stores);
            setStores(stores);
            setFilteredStores(stores);
        } catch (error) {
            toast.error("Failed to load stores.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredStores(stores);
        } else {
            const filtered = stores.filter((store) =>
                store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                store.address.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredStores(filtered); // Show filtered stores
        }
    }, [searchQuery, stores]);

    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Explore Stores</h2>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by store name..."
                    className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {loading ? (
                <p className="text-center text-muted-foreground">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStores.length > 0 ? (
                        filteredStores.map((store) => (
                            <StoreRatingSummary
                                key={store.id}
                                storeId={store.id}
                                name={store.name}
                                address={store.address}
                                rating={store.averageRating}
                                ratingCount={store.totalRatings || 0}
                                userRating={store.userRating || 0}
                                refreshStores={fetchStores}
                                isShow={true}
                            />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-muted-foreground">No stores found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default StoreList;
