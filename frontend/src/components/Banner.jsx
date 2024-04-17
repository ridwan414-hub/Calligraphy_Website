import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <section className="flex justify-between max-h-fit p-5 m-auto bg-[linear-gradient(to_right,_#c1ffdb,_#59e4fc,_#79c7ff)]">
        <div className="w-1/2">
        <h4 className="text-2xl text-[#222] pt-10 pl-5 font-sty italic mt-14">Super Value Deals!</h4>
          <h1 className="italic font-medium  pt-10  text-[55px] leading-[60px] text-[#222]">
            &quot;Elegance in Every Stroke&quot;
          </h1>
          <h2 className="font-mono pt-8 pb-4 pl-5 text-[35px] leading-[54px] text-[#222]">
            <strong className="font-mono text-[#c15742]">Shop</strong>{' '}
            Handcrafted Calligraphy Here!
          </h2>
          <p className="text-base text-[#8842c1] mt-[15px] pl-5 mb-5 mx-0;">
            Save More with Coupons and Flash Sales (Upto 70%)
          </p>
          <div className="relative bottom-7 left-5">
            <img
              src="../../../Images/button-01-01-01-01.png"
              className="w-48"
              alt=""
            />
            <Link reloadDocument to="/Products" >
              <span className="text-lg font-bold relative bottom-[90px] left-[54px] text-[#6c2338fd]">
                Shop Now
              </span>
            </Link>
          </div>
        </div>
        <div className="">
          <img
            src="../../../Images/FB_IMG_1708512680043.jpg"
            alt="img"
            className="h-[600px] "
          />
        </div>
      </section>
    </>
  );
};

export default Banner;
