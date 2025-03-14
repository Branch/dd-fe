/** @format */

import React from "react";
interface StarRatingProps {
  maxStars: number;
  rating: number;
  styles?: string;
}
const StarRating = ({ maxStars = 5, rating = 0, styles }: StarRatingProps) => {
  return (
    <div className="flex space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-1xl cursor-pointer transition-colors ${styles ? styles : ""} ${
              starValue <= rating
                ? "text-djungleYellow"
                : "text-djungleBlack/40"
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
