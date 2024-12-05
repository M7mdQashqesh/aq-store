import Header from "../../components/header/Header";
import "./home.css";
import { Products } from "../../../public/products";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <Header />
      {/* Start Landing Page */}
      <div className="landing">
        <div className="container">
          <img
            className="large-landing"
            src="/landing-largeScreen.svg"
            alt="landing image"
          />
        </div>
      </div>
      {/* End Landing Page */}
      {/* Start Some Product */}
      <div className="some-products">
        <div className="container">
          <h2>Top Picks</h2>
          <div className="productItems">
          {Products.slice(0, 4).map((product) => (
            <div key={product.id} className="productItem">
              <img
                src={product.product_image}
                alt="product"
              />
              <div className="info">
                <span className="nameOfProduct">{product.product_name}</span>
                <span className="price">{product.product_price}</span>
              </div>
              <p className="description">{product.product_description}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
          </div>
          <button className="show-all" onClick={() => navigate("/products")}>Show All Products</button>
        </div>
      </div>
      {/* End Some Product */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
};

export default Home;
