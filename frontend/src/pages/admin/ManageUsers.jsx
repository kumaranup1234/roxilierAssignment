import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/admin.js";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/common/UserCard";
import EditUserDialog from "@/components/admin/EditUserDialog";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortKey, setSortKey] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

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

    const filteredAndSortedUsers = users
        .filter((user) =>
            `${user.name} ${user.email} ${user.address} ${user.role}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const aVal = a[sortKey]?.toString().toLowerCase();
            const bVal = b[sortKey]?.toString().toLowerCase();

            if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
            else return aVal < bVal ? 1 : -1;
        });


    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Manage Users</h1>
                <Button onClick={() => setShowCreate(true)}>Create New User</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name, email, address, role"
                    className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className="border px-3 py-2 rounded-md border-r-8 border-transparent outline outline-gray-300"
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="address">Address</option>
                    <option value="role">Role</option>
                </select>

                <select
                    className="border px-3 py-2 rounded-md border-r-8 border-transparent outline outline-gray-300"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-4">
                {filteredAndSortedUsers.map((user) => (
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
