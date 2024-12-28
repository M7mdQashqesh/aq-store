import Header from "../../components/header/Header";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-us-page">
      <Header />
      <div className="container">
        <div className="card">
          <h2>Contact</h2>
          <p>
            We are here to help! Feel free to contact us via WhatsApp for any
            inquiries.
          </p>
          <div className="image">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="btns">
            <a
              href="https://wa.me/972598368442"
              className="whatsapp-button"
              target="_blank"
            >
              <i className="fab fa-whatsapp"></i> Eng.Abed Qashqeesh
            </a>
            <a
              href="https://wa.me/972597153227"
              className="whatsapp-button"
              target="_blank"
            >
              <i className="fab fa-whatsapp"></i> Ayham Qashqeesh
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
