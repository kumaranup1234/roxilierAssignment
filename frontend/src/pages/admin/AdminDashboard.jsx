import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/admin.js";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Store, Star } from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const toastId = toast.loading("Loading data..");
                const data = await getDashboardStats();
                setStats(data);
                toast.dismiss(toastId);
                toast.success("Successfully loaded data.");
            } catch (error) {
                console.error("Dashboard load failed:", error.message);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        {
            icon: <Users className="h-6 w-6 text-blue-600" />,
            title: "Total Users",
            value: stats.totalUsers,
            button: "Manage Users",
            route: "/admin/users"
        },
        {
            icon: <Store className="h-6 w-6 text-green-600" />,
            title: "Total Stores",
            value: stats.totalStores,
            button: "Manage Stores",
            route: "/admin/stores"
        },
        {
            icon: <Star className="h-6 w-6 text-yellow-500" />,
            title: "Total Ratings",
            value: stats.totalRatings,
            button: "View Ratings",
            route: "/admin/ratings"
        }
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <Card key={index} className="flex flex-col justify-between h-full p-4">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
                            {card.icon}
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{card.value}</p>
                            <Button
                                className="mt-4 text-sm w-full hover:cursor-pointer"
                                variant="outline"
                                onClick={() => navigate(card.route)}
                            >
                                {card.button}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
