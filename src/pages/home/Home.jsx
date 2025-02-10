import Header from "../../components/header/Header";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import ProductItem from "../../components/productItem/ProductItem";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Features from "../../components/features/Features";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate("");

  const navigateToPage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name, // تعديل هنا ليتوافق مع الحقل 'name' بدل 'product_name'
          price: doc.data().price, // تعديل هنا ليتوافق مع الحقل 'price'
          image: doc.data().image, // تعديل هنا ليتوافق مع الحقل 'image'
          shortDescription: doc.data().shortDescription, // تعديل هنا ليتوافق مع الحقل 'shortDescription'
        }));

        const randomProducts = allProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);

        setProducts(randomProducts);
      } catch (error) {
        console.log("error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="Home">
      <Header />
      <div className="landing">
        <div className="img"></div>
      </div>
      <Features />
      <div className="some-products">
        <div className="container">
          <h2>Top Picks</h2>
          <div className="productItems">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                navigate={navigateToPage}
              />
            ))}
          </div>
          <button
            className="show-all"
            onClick={() => navigateToPage("/products")}
          >
            Show All Products
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
