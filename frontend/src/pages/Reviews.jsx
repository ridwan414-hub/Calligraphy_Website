import ReviewsCards from '../components/ReviewsCards';

const Reviews = () => {
  const reviews = [
    '../../Images/Reviews/FB_IMG_1708513021788.jpg',
    '../../Images/Reviews/FB_IMG_1708512540925.jpg',
    '../../Images/Reviews/FB_IMG_1708512882636.jpg',
    '../../Images/Reviews/FB_IMG_1708512906024.jpg',
    '../../Images/Reviews/FB_IMG_1708513013742.jpg',
  ];

  return (
    <div>
      <div className=" bg-[linear-gradient(30deg,_#fff1eb,_#ace0f9)] container mx-auto py-8 pl-5">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-3 mt-3 italic">Customer Reviews</h1>
        <div className="grid grid-cols-2 gap-8">
          {reviews.map((image, index) => (
            <ReviewsCards key={index} img={image} className="review-card" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;