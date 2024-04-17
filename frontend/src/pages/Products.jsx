import { Link } from 'react-router-dom';
import Cards from '../components/Cards';

const Products = () => {
  const images = [
    'https://i.ibb.co/RTn8XFj/FB-IMG-1708512456963.jpg',
    'https://i.ibb.co/sVpyTyQ/FB-IMG-1708512480462.jpg',
    'https://i.ibb.co/R9VXvFK/FB-IMG-1708512501351.jpg',
    'https://i.ibb.co/7G1bH6s/FB-IMG-1708512514316.jpg',
    'https://i.ibb.co/HNpsWjr/FB-IMG-1708512592256.jpg',
    'https://i.ibb.co/px6C7rc/FB-IMG-1708512626119.jpg',
    'https://i.ibb.co/bXsnncW/FB-IMG-1708512680043.jpg',
    'https://i.ibb.co/p37h8gF/FB-IMG-1708512835936.jpg',
    'https://i.ibb.co/HgpJHLq/FB-IMG-1708512838746.jpg',
    'https://i.ibb.co/pZQ7p69/FB-IMG-1708512843563.jpg',
    'https://i.ibb.co/L1H8PFJ/FB-IMG-1708512899181.jpg',
    'https://i.ibb.co/4VW5gJB/FB-IMG-1708512925677.jpg',
    'https://i.ibb.co/CtTL7JX/FB-IMG-1708512933875.jpg',
    'https://i.ibb.co/YdfLhvx/FB-IMG-1708512952026.jpg',
    'https://i.ibb.co/4NxVHrh/FB-IMG-1708513037127.jpg',
    'https://i.ibb.co/jrcjJDY/FB-IMG-1708513079086.jpg',
    'https://i.ibb.co/KjdPZ22/p1.jpg',
    'https://i.ibb.co/G0jRs5v/p2.jpg',
    'https://i.ibb.co/vwYGvYx/p3.jpg',
    'https://i.ibb.co/L6hz5cc/p4.jpg',
    'https://i.ibb.co/K7nLf0t/p5.jpg',
    'https://i.ibb.co/Q8th6FD/p6.jpg',
    'https://i.ibb.co/bFXc8cQ/p7.jpg',
    'https://i.ibb.co/1JFVBcK/p8.jpg',
    // ... your other image paths
  ];

  return (
    <div className="product-page bg-[linear-gradient(240deg,_#D9AFD9,_#97D9E1)] min-h-screen flex flex-col">
      {' '}
      {/* Modified background color with linear gradient */}
      <main className="flex-grow container mx-auto px-4 py-8 mt-4">
        <h1 className="text-4xl font-bold mb-3 text-center">
          {' '}
          {/* Added text color and centered text */}
          <span className="text-gray-800 font-serif italic">
            Our Products
          </span>{' '}
          {/* Only styling the "Our Products" line */}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {images.map((image) => (
            <Cards key={image} img={image} />
          ))}
        </div>
      </main>
      <section className="cta-section bg-[linear-gradient(to_right,_#E0EAFC,_#CFDEF3)] py-8 text-center">
        <h2 className="text-3xl font-semibold mb-8 mt-2">
          Ready to personalize your space?
        </h2>
        <Link
          reloadDocument
          to="/Login"
          className="btn btn-primary bg-red-300 hover:bg-red-500 rounded-full py- px-6 text-xl font-bold shadow-lg hover:shadow-xl transition duration-300"
        >
          Log in to Buy
        </Link>{' '}
        {/* Connect the button to the login page */}
      </section>
    </div>
  );
};

export default Products;
