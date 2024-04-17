const ReviewsCards = (props) => {
    return (
      <div className="review-card h-[570px] bg-[linear-gradient(0deg,_#D3CCE3,_#E9E4F0)] shadow-lg rounded-md p-6 mb-10 ml-10 mt-8 mr-8 transition-transform duration-300 hover:shadow-xl hover:scale-105">
        <img src={props.img} alt="Review" className="w-[90%] h-[450px] mb-6 ml-[32px] rounded-md" />
        <div className="ml-[50px] mt- ">
          <h2 className="text-xl font-semibold text-gray-800">Customer Name: {props.customerName}</h2>
          <p className="text-gray-600">Reviewed on: {props.reviewDate}</p>
        </div>
      </div>
    );
  };
  
  export default ReviewsCards;
  