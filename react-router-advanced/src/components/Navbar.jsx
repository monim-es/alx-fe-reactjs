import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/blog/123">Blog Post 123</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </nav>
);

export default Navbar;
