"use client";
import DOMPurify from "dompurify";
import { axiosInstance } from "@/lib/axios";
import { Review } from "@/types";
import { useEffect, useState } from "react";
import ReviewLoader from "../Loaders/ReviewLoader";

const ReviewCard = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axiosInstance.get("/reviews");
        const data = (await response.data) as Review[];
        setReviews(
          data.map((review) => ({
            ...review,
            text: DOMPurify.sanitize(review.text),
          }))
        );
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2  max-w-5xl mx-auto">
        {[...Array(6)].map((_, index) => (
          <ReviewLoader key={index} />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500 bg-[#D9D9D9] p-4 rounded-2xl space-y-3 text-2xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2  max-w-5xl mx-auto">
      {reviews.map((review) => (
        <div
          className="bg-[#D9D9D9] p-4 rounded-2xl space-y-3 text-2xl"
          key={review.id}
          dangerouslySetInnerHTML={{ __html: review.text }}
        />
      ))}
    </div>
  );
};

export default ReviewCard;
