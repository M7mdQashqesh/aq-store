import "./productDetail.css";
import { Products } from "../../../public/products";
import Header from "../../components/header/Header";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Alert from "@mui/material/Alert";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

const ProductDetail = () => {
  const { id } = useParams();
  const product = Products.find((p) => p.id === parseInt(id));
  const navigate = useNavigate("");

  const navigateToPage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const [itemsInCart, setItemsInCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const plusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const minusQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleToCart = () => {
    const updatedCart = [
      ...itemsInCart,
      {
        id: product.id,
        pName: product.product_name,
        pImage: product.product_image,
        pQuantity: quantity,
        pPrice: product.product_price,
        pCategory: product.category,
      },
    ];

    setItemsInCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="product-details">
      <Header />
      <div className="container">
        <div className="title" onClick={() => navigateToPage("/products")}>
          <ReplyAllIcon className="go-back" />
          <span>Go Back</span>
        </div>
        <div className="product">
          <div className="image">
            <img
              src={product.product_image}
              alt={`Image of ${product.product_name}`}
            />
          </div>
          <div className="details">
            <h2 className="price">{product.product_price} ₪</h2>
            <h3 className="product-name">{product.product_name}</h3>
            <p className="description">{product.product_long_description}</p>
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

            <button className="add-to-cart" onClick={handleToCart}>
              Add to Cart
            </button>
            {showNotification && (
              <Alert className="Alert" variant="filled" severity="success">
                The product has been successfully added to the cart!
              </Alert>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
