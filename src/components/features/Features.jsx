import "./features.css";

const Features = () => {
  return (
    <div className="features">
        <div className="container">
          <div className="feature">
            <i className="fa-solid fa-truck-fast"></i>
            <div className="info">
              <span>Fast and safe shipping</span>
              <span>For all products</span>
            </div>
          </div>
          <div className="feature">
            <i className="fa-regular fa-credit-card"></i>
            <div className="info">
              <span>Payment methods</span>
              <span>Cash on delivery</span>
            </div>
          </div>
          <div className="feature">
            <i className="fa-solid fa-headset"></i>
            <div className="info">
              <span>Support</span>
              <span>24/7 dedicated support</span>
            </div>
          </div>
          <div className="feature last-feature">
            <i className="fa-solid fa-sack-dollar"></i>
            <div className="info">
              <span>Return Policy</span>
              <span>If the products have problems</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Features