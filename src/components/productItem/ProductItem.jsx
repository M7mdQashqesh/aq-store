import "./productItem.css";
import PropTypes from "prop-types";

const ProductItem = ({ product, navigate }) => {
  return (
    <div key={product.id} className="productItem">
      <div className="image">
        <img src={product.image} alt="product" />
      </div>
      <div className="info">
        <span className="nameOfProduct">{product.name}</span>
        <span className="price">{product.price} ₪</span>
      </div>
      <p className="description">{product.shortDescription}</p>
      <button
        className="details"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        View Details
      </button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default ProductItem;
