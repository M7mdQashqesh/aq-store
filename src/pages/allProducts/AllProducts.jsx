import Header from "../../components/header/Header";
import "./allProducts.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import ProductItem from "../../components/productItem/ProductItem";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../firebase";

const AllProducts = () => {
  const [products, setProducts] = useState([]); // لتخزين المنتجات القادمة من Firestore
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate("");

  const navigateToPage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore(app); // تهيئة Firebase
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name, // تعديل هنا ليتوافق مع الحقل 'name' بدل 'product_name'
        price: doc.data().price, // تعديل هنا ليتوافق مع الحقل 'price'
        image: doc.data().image, // تعديل هنا ليتوافق مع الحقل 'image'
        shortDescription: doc.data().shortDescription, // تعديل هنا ليتوافق مع الحقل 'shortDescription'
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

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
              .sort((a, b) => a.name.localeCompare(b.name))
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
