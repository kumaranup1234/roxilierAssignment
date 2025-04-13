import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { submitRating } from "@/services/user.js";
import toast from "react-hot-toast";

const StoreRatingSummary = ({
                                storeId,
                                name,
                                address,
                                rating,
                                ratingCount,
                                userRating = 0,
                                imageUrl = "/placeholder.svg?height=200&width=400"
                            }) => {
    const [selectedRating, setSelectedRating] = useState(userRating);

    const handleStarClick = async (value) => {
        try {
            await submitRating({ storeId, rating: value });
            setSelectedRating(value);
            toast.success("Rating submitted!");
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Generate interactive stars
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isActive = i <= selectedRating;
            stars.push(
                <Star
                    key={i}
                    className={`h-5 w-5 cursor-pointer transition-all ${
                        isActive ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                    }`}
                    onClick={() => handleStarClick(i)}
                />
            );
        }
        return stars;
    };

    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                />
                <Badge className="absolute right-2 top-2 bg-white/90 text-black hover:bg-white/80">
                    {rating.toFixed(1)} ({ratingCount})
                </Badge>
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">{name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 text-sm text-muted-foreground">
                <p>{address}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-0">
                <div className="flex items-center gap-0.5">{renderStars()}</div>
                <span className="text-sm text-muted-foreground">{ratingCount} reviews</span>
            </CardFooter>
        </Card>
    );
};

export default StoreRatingSummary;
