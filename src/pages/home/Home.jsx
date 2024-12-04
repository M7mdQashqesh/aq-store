import Header from "../../components/header/Header";
import "./home.css";
import { Products } from "../../../public/products";

const Home = () => {
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
                src="https://thumbs.dreamstime.com/z/dental-cleaning-tools-oral-care-hygiene-products-dental-cleaning-tools-oral-care-hygiene-products-toothbrush-toothpaste-102032617.jpg"
                alt="product"
              />
              <div className="info">
                <span className="nameOfProduct">{product.product_name}</span>
                <span className="price">{product.product_price}</span>
              </div>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
          </div>
        </div>
      </div>
      {/* End Some Product */}
    </div>
  );
};

export default Home;
