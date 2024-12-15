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
      {/* Start Landing */}
      <div className="landing">
        <div className="img"></div>
      </div>
      {/* End Landing */}
      {/* Start Features */}
      <div className="features">
        <div className="container">
          <div className="feature">
            <i className="fa-solid fa-truck-fast"></i>
            <div className="info">
              <span>Fast and safe shipping</span>
              <span>For all products</span>
            </div>
          </div>
          <div className="feature">
            <i className="fa-regular fa-credit-card"></i>
            <div className="info">
              <span>Payment methods</span>
              <span>Cash on delivery</span>
            </div>
          </div>
          <div className="feature">
            <i className="fa-solid fa-headset"></i>
            <div className="info">
              <span>Support</span>
              <span>24/7 dedicated support</span>
            </div>
          </div>
          <div className="feature last-feature">
            <i className="fa-solid fa-sack-dollar"></i>
            <div className="info">
              <span>Return Policy</span>
              <span>If the products have problems</span>
            </div>
          </div>
        </div>
      </div>
      {/* End Features */}
      {/* Start Some Product */}
      <div className="some-products">
        <div className="container">
          <h2>Top Picks</h2>
          <div className="productItems">
            {Products.slice(0, 4).map((product) => (
              <div key={product.id} className="productItem">
                <div className="image">
                  <img src={product.product_image} alt="product" />
                </div>
                <div className="info">
                  <span className="nameOfProduct">{product.product_name}</span>
                  <span className="price">{product.product_price}</span>
                </div>
                <p className="description">{product.product_description}</p>
                <button
                    className="details"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </button>
              </div>
            ))}
          </div>
          <button className="show-all" onClick={() => navigate("/products")}>
            Show All Products
          </button>
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
