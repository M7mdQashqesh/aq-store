import "./productDetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../firebase";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Snackbar, Alert } from "@mui/material"; // استيراد MUI Snackbar و Alert

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false); // حالة التحكم بظهور Snackbar

  useEffect(() => {
    const fetchProduct = async () => {
      const db = getFirestore(app);
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() });
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setOpenSnackbar(true); // إظهار الـ Snackbar
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  return (
    <div className="product-details">
      <Header />
      <div className="container">
        <div className="product-info">
          <div className="image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="details">
            <p className="price">{product.price}₪</p>
            <h2>{product.name}</h2>
            <p className="short-description">{product.shortDescription}</p>
            <label>Quantity:</label>
            <div className="quantity">
              <div className="increase" onClick={increaseQuantity}>
                +
              </div>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
              <div className="decrease" onClick={decreaseQuantity}>
                -
              </div>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />

      {/* Snackbar لإشعار المستخدم بإضافة المنتج إلى السلة */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // مدة الإشعار 3 ثواني
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetails;
