import "./addProduct.css";
import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productShortDescription, setProductShortDescription] = useState("");
  const [productLongDescription, setProductLongDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const navigateToPage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigateToPage("/");
    }
  });

  const clearFields = () => {
    setProductName("");
    setProductPrice("");
    setProductImage(null);
    setProductShortDescription("");
    setProductLongDescription("");
    fileInputRef.current.value = ""; // إعادة تعيين حقل الصورة
    setError("");
  };

  const validateForm = () => {
    if (!productName.trim()) {
      setError("Product name is required.");
      return false;
    }
    if (!productPrice || isNaN(productPrice) || parseFloat(productPrice) <= 0) {
      setError("Product price must be a positive number.");
      return false;
    }
    if (!productImage) {
      setError("Product image is required.");
      return false;
    }
    if (!productShortDescription.trim()) {
      setError("Product short description is required.");
      return false;
    }
    if (!productLongDescription.trim()) {
      setError("Product long description is required.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (productImage) {
        // 1️⃣ رفع الصورة إلى Cloudinary
        const formData = new FormData();
        formData.append("file", productImage);
        formData.append("upload_preset", "aqstore");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dtvwphm7h/image/upload",
          formData
        );
        imageUrl = response.data.secure_url; // الحصول على رابط الصورة
      }
      // إضافة منتج جديد إلى مجموعة "products" في Firestore
      const docRef = await addDoc(collection(db, "products"), {
        name: productName,
        price: parseFloat(productPrice),
        image: imageUrl,
        shortDescription: productShortDescription,
        longDescription: productLongDescription,
      });
      console.log("Product added with ID: ", docRef.id);
      // مسح الحقول بعد الإضافة
      clearFields();
      alert("Product added successfully!");
    } catch (error) {
      console.log("Error adding product:", error);
      setError("An error occurred while adding the product.");
      alert("An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <Sidebar />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setProductImage(e.target.files[0])}
          ref={fileInputRef}
        />
        <textarea
          placeholder="Product short description"
          value={productShortDescription}
          onChange={(e) => setProductShortDescription(e.target.value)}
        />
        <textarea
          placeholder="Product long description"
          value={productLongDescription}
          onChange={(e) => setProductLongDescription(e.target.value)}
        />

        {/* عرض رسالة الخطأ */}
        {error && <p className="error-message">{error}</p>}

        <input
          type="submit"
          value={loading ? "Adding..." : "Add Product"}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default AddProduct;
