import "./productItem.css";
import PropTypes from 'prop-types';

const ProductItem = ({ product, navigate }) => {
  return (
    <div key={product.id} className="productItem">
      <div className="image">
        <img src={product.product_image} alt="product" />
      </div>
      <div className="info">
        <span className="nameOfProduct">{product.product_name}</span>
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
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    product_image: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    product_price: PropTypes.number.isRequired,
    product_description: PropTypes.string.isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default ProductItem