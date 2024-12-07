import Header from "../../components/header/Header";
import "./allProducts.css";
import { Products } from "../../../public/products";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const AllProducts = () => {
  const navigate = useNavigate();

  return (
    <div className="AllProducts">
      <Header />
      <div className="container">
        <div className="title">
          <span onClick={() => navigate("/")}>Home</span>
          <span> \ </span>
          <span>All Products</span>
        </div>

        <div className="search">
          <input type="search" placeholder="Search Here"/>
          
          {<p>{Products.length} Products found</p>}
        </div>

        <div className="products">
          {Products.map((product) => {
            return (
              <div key={product.id} className="productItem">
                <div className="image">
                  <img src={product.product_image} alt="product" />
                </div>
                <div className="info">
                  <span className="nameOfProduct">{product.product_name}</span>
                  <span className="price">{product.product_price}</span>
                </div>
                <p className="description">{product.product_description}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AllProducts;
