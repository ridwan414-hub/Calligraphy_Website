import Carts from '../../pages/Carts';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <>
      <section id="header">
        <img
          src="../../../Images/BristysArtwork.png"
          alt="logo"
          className="logo"
        />
        <div>
          <ul id="navbar">
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/products'}>Products</Link>
            </li>
            <li>
              <Link to={'/reviews'}>Reviews</Link>
            </li>
            <li>
              <Link to={'/Videos'}>Videos</Link>
            </li>
            <li>
              <Link to={'/blogs'}>Blogs</Link>
            </li>
            <li>
              <Link to={'/contact'}>Contact</Link>
            </li>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Carts></Carts>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Header;
