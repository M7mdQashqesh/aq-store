import { useEffect, useState } from "react";
import "./manageProducts.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../firebase";
import { Modal, Box, Typography, Button, Snackbar, Alert } from "@mui/material";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore(app);
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        image: doc.data().image,
        shortDescription: doc.data().shortDescription,
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "products", selectedProduct.id));
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      setSnackbarOpen(true);
      handleClose();
    }
  };

  return (
    <div className="manage-products">
      <Sidebar />
      <div className="products">
        <h2>Products</h2>
        {products.map((product) => (
          <div key={product.id} className="product">
            <div className="image">
              <img src={product.image} alt="productImage" />
            </div>
            <p className="name">{product.name}</p>
            <p className="price">{product.price}₪</p>
            <p className="description">{product.shortDescription}</p>
            <button onClick={() => handleOpen(product)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete {selectedProduct?.name}?
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes, delete
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product has been successfully deleted!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageProducts;
