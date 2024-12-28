import Header from "../../components/header/Header";
import "./allProducts.css";
import { Products } from "../../../public/products";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import ProductItem from "../../components/productItem/ProductItem";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate("");

  const navigateToPage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };
  

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
          <span onClick={() => navigateToPage("/")}>Home</span>
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
            filteredProducts
              .sort((a, b) => a.product_name.localeCompare(b.product_name))
              .map((product) => {
                return (
                  <ProductItem
                    key={product.id}
                    product={product}
                    navigate={navigateToPage}
                  />
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
