import Header from "../../components/header/Header";
import "./allProducts.css";
import { Products } from "../../../public/products";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { useState } from "react";

const AllProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = searchTerm
    ? Products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : Products;

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
          <input
            type="search"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {<p>{filteredProducts.length} Products found</p>}
        </div>

        <div className="products">
          {filteredProducts.length !== 0 ? (
            filteredProducts.map((product) => {
              return (
                <div key={product.id} className="productItem">
                  <div className="image">
                    <img src={product.product_image} alt="product" />
                  </div>
                  <div className="info">
                    <span className="nameOfProduct">
                      {product.product_name}
                    </span>
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
              );
            })
          ) : (
            <p className="no-items">No products match your search criteria.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;
