import "./productDetail.css";
import { Products } from "../../../public/products";
import Header from "../../components/header/Header";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const product = Products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);

  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-details">
      <Header />
      <div className="container">
        <div className="product">
          <div className="image">
            <img src={product.product_image} alt={product.product_name} />
          </div>
          <div className="details">
            <h2 className="price">{product.product_price}</h2>
            <h3 className="product-name">{product.product_name}</h3>
            <p className="description">{product.product_description}</p>
            <div className="quantity-container">
              <p>Quantity: </p>
              <div className="quantity">
                <button className="remove" onClick={minusQuantity}>
                  -
                </button>
                <div>{quantity}</div>
                <button className="add" onClick={plusQuantity}>
                  +
                </button>
              </div>
            </div>

            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
