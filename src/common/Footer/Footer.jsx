import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import qrcode from "./../../assets/images/qrcode.jpg";
import google from "./../../assets/images/google.png";
import appstore from "./../../assets/images/appStore.png";

function Footer() {
  return (
    <footer className="bg-black text-white pt-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md">
            <h5 className="mb-3">Exclusive</h5>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Send Email"
                className="form-control me-2"
                aria-label="Email"
              />
              <button type="submit" className="btn btn-light">
                Send
              </button>
            </form>
          </div>

          <div className="col-md">
            <h5 className="mb-3">Support</h5>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <li className="list-unstyled">+88015-88888-9999</li>
          </div>

          <div className="col-md">
            <h5 className="mb-3">Account</h5>
            <ul className="list-unstyled">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>

          <div className="col-md">
            <h5 className="mb-3">Quick Link</h5>
            <ul className="list-unstyled">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="col-md">
            <h5 className="mb-3">Download App</h5>
            <p>Save $3 with App New User Only</p>
            <div className="d-flex align-items-start gap-3 flex-wrap">
              <div style={{ width: "80px" }}>
                <img src={qrcode} alt="QR Code" className="img-fluid" />
              </div>
              <div className="d-flex flex-column justify-content-center">
                <img
                  src={google}
                  alt="Google Play"
                  style={{ height: "45px" }}
                />
                <img
                  src={appstore}
                  alt="App Store"
                  style={{ height: "45px" }}
                />
              </div>
            </div>

            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-white" aria-label="Facebook">
                <FaFacebookSquare />
              </a>
              <a href="#" className="text-white" aria-label="Instagram">
                <FaSquareInstagram />
              </a>
              <a href="#" className="text-white" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="text-white" aria-label="Twitter">
                <FaSquareXTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-center py-2"
        style={{ backgroundColor: "rgba(255,255,255,0.1)", height: "34px" }}
      >
        © 2025 Copyright:
        <a
          href="#"
          className="text-white ms-2 text-decoration-none fw-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright Rimel 2022. All right reserved
        </a>
      </div>
    </footer>
  );
}

export default Footer;
