import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/admin.js";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/common/UserCard";
import EditUserDialog from "@/components/admin/EditUserDialog";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            console.log(data);
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
            user.name?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query) ||
            user.address?.toLowerCase().includes(query) ||
            user.role?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by store name, email, role, address"
                    className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Manage Users</h1>
                <Button onClick={() => setShowCreate(true)}>Create New User</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} refresh={fetchUsers} />
                ))}
            </div>

            {showCreate && (
                <EditUserDialog
                    mode="create"
                    open={showCreate}
                    setOpen={setShowCreate}
                    refresh={fetchUsers}
                />
            )}
        </div>
    );
};

export default ManageUsers;
