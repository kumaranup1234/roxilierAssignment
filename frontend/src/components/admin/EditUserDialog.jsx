import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { updateUser, createUser } from "@/services/admin.js";

const EditUserDialog = ({ mode = "edit", user = {}, open, setOpen, refresh }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        role: "user",
        password: ""
    });

    useEffect(() => {
        if (mode === "edit" && user) {
            setFormData(prevState => ({
                ...prevState,
                name: user.name || "",
                email: user.email || "",
                address: user.address || "",
                role: user.role || "user",
                password: ""
            }));
        } else {
            setFormData({ name: "", email: "", address: "", role: "user", password: "" });
        }
    }, []);

    const handleSubmit = async () => {
        try {
            if (mode === "edit") {
                await updateUser(user.id, formData.name, formData.email, formData.address, formData.role);
                toast.success("User updated successfully");
            } else {
                await createUser(formData.name, formData.email, formData.address, formData.password, formData.role);
                toast.success("User created successfully");
            }
            setOpen(false);
            refresh();
        } catch (error) {
            toast.error(`Failed to ${mode === "edit" ? "update" : "create"} user`);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">{mode === "edit" ? "Edit User" : "Create New User"}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            className="w-full border px-3 py-2 rounded-md"
                            autoFocus={false}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            className="w-full border px-3 py-2 rounded-md"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input
                            className="w-full border px-3 py-2 rounded-md"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            className="w-full border px-3 py-2 rounded-md"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="store_owner">Store Owner</option>
                        </select>
                    </div>
                    {mode === "create" && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full border px-3 py-2 rounded-md"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    )}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        {mode === "edit" ? "Save Changes" : "Create User"}
                    </button>
                </div>
                <button
                    onClick={() => setOpen(false)}
                    className="w-full mt-4 text-sm text-gray-600 hover:underline text-center"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditUserDialog;