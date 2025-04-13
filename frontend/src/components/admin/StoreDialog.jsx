import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createStore, updateStore } from "@/services/admin";
import toast from "react-hot-toast";

const StoreDialog = ({ mode, store, open, setOpen, refresh }) => {
    const [formData, setFormData] = useState({
        name: store?.name || "",
        address: store?.address || "",
        ownerEmail: store?.ownerEmail || "",
    });

    const handleSubmit = async () => {
        try {
            if (mode === "edit") {
                await updateStore(store.id, formData.name, formData.address);
                toast.success("Store updated successfully");
            } else {
                await createStore(formData.name, formData.address, formData.ownerEmail);
                toast.success("Store created successfully");
            }
            setOpen(false);
            refresh();
        } catch (error) {
            toast.error(`Failed to ${mode} store`);
        }
    };

    useEffect(() => {
        if (mode === "edit" && store) {
            setFormData({
                name: store.name,
                address: store.address,
            });
        }
    }, [mode, store]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="hidden">
                    {mode === "edit" ? "Edit Store" : "Create Store"}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{mode === "edit" ? "Edit Store" : "Create New Store"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label>Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Owner Email</Label>
                        <Input
                            value={formData.ownerEmail}
                            onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                        />
                    </div>
                    <Button className="w-full mt-2" onClick={handleSubmit}>
                        {mode === "edit" ? "Save Changes" : "Create Store"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StoreDialog;
