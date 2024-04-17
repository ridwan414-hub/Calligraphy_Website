const Cards = (props) => {
  return (
    <div className="card bg-blue-100 shadow-xl ml-6 mr-6 mt-8 p-3 transform transition duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-2xl"> 
      <figure>
        <img src={props.img} alt="Shoes" className="w-full h-[260px] " /> 
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl">
          Stylish Wall Frame
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p className="text-gray-700 text-base">Add elegance to your space with this beautiful wall frame.</p>
        <p className="text-blue-700 font-bold text-xl mt-3">$4.99</p> {/* Changed text color to blue, increased font size to text-2xl, and adjusted margin */}
      </div>
      <div className="card-actions justify-end mt-4"> {/* Increased top margin */}
        <button
          onClick={() => props.onAddToCart(props.img)}
          className="btn btn-primary bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300" // Modified button style
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
//     console.log(props)
//     return (
//       <>
//         <div className="card w-96 bg-base-100 shadow-xl  ">
//           <figure>
//             <img
//               src={props.img}
//               alt="Shoes"
//               style={{ height:'400px',width: '400px'}}
//             />
//           </figure>
//           <div className="card-body ">
//             <h2 className="card-title">
//               Shoes!
//               <div className="badge badge-secondary">NEW</div>
//             </h2>
//             <p>If a dog chews shoes whose shoes does he choose?</p>
//             <div className="card-actions justify-end">
//               <div className="badge badge-outline">Fashion</div>
//               <div className="badge badge-outline">Products</div>
//             </div>
//           </div>
//             </div>
            
//       </>
//     );


export default Cards;
