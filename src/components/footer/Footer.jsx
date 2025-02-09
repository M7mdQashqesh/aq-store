import { useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="top">
        <div className="container">
          <div className="col-one">
            <h3>About Us</h3>
            <p>
              At AQ Store, we provide high-quality dental supplies for
              professionals and individuals. Our goal is to support optimal oral
              health with trusted products and exceptional customer service. We
              aim to make dental care accessible and convenient for all.
            </p>
          </div>
          <div className="col-two">
            <h3>Contact Us</h3>
            <div className="icons">
              <a
                className="abed-whats"
                href="https://wa.me/972598368442"
                target="_blank"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a
                className="ayham-whats"
                href="https://wa.me/972597153227"
                target="_blank"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="mailto:aqqashqesh@gmail.com" target="_blank">
                <i className="fa-regular fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright" >
        <div className="container" onClick={() => navigate("/")}>
          © 2024 AQ Store - All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
