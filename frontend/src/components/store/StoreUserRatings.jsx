import { Star } from "lucide-react"
import nameIcon from "@/assets/name.svg";
import ratingIcon from "@/assets/rating.svg";

const StoreUserRatings = ({
                                name,
                                rating,
                            }) => {
    // Generate stars based on rating
    const renderStars = () => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star className="h-5 w-5 text-muted-foreground" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        </div>
                    </div>,
                )
            } else {
                stars.push(<Star key={i} className="h-5 w-5 text-muted-foreground" />)
            }
        }

        return stars
    }

    return (
        <div className="border border-gray-200 h-auto lg:w-80 p-6 rounded-2xl bg-white shadow-lg">
            <h1 className="text-lg font-bold">User Details</h1>
            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={nameIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Name:</p>
                    <p className="text-sm font-semibold">{name}</p>
                </div>
            </div>

            <div className="flex space-x-2 mt-4 dark:text-white">
                <img src={ratingIcon} alt="Clock" className="h-5" />
                <div>
                    <p className="text-sm">Rating:</p>
                    <div className="flex items-center gap-1">
                        {renderStars()}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default StoreUserRatings;