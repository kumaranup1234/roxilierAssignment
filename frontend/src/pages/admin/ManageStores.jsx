import { useState, useEffect } from "react";
import { getAllStores } from "@/services/admin.js";
import StoreCard from "@/components/common/StoreCard";
import StoreDialog from "@/components/admin/StoreDialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const ManageStores = () => {
    const [stores, setStores] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


    const fetchStores = async () => {
        try {
            const data = await getAllStores();
            console.log(data);
            setStores(data);
        } catch (err) {
            toast.error("Failed to load stores");
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const filteredUsers = stores.filter((stores) => {
        const query = searchQuery.toLowerCase();
        return (
            stores.name?.toLowerCase().includes(query) ||
            stores.ownerEmail?.toLowerCase().includes(query) ||
            stores.address?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Manage Stores</h1>
                <Button onClick={() => setShowDialog(true)}>Create New Store</Button>
            </div>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by store name, email, role, address"
                    className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((store) => (
                    <StoreCard key={store.id} store={store} refresh={fetchStores} />
                ))}
            </div>

            {showDialog && (
                <StoreDialog
                    mode="create"
                    open={showDialog}
                    setOpen={setShowDialog}
                    refresh={fetchStores}
                />
            )}
        </div>
    );
};

export default ManageStores;
