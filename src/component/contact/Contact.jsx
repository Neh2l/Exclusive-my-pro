import { useState } from "react";
import "./contact.css";
import CreateContact from "../../Apis/Contact";
import { useLocation, Link } from "react-router-dom";
import { FiPhoneCall, FiMail, FiUser } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!emailRegex.test(email)) newErrors.email = "Email is invalid";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setSuccess("You must be logged in to send a message.");
          setLoading(false);
          return;
        }

        const response = await CreateContact(
          { userName: name, email, phone, message },
          token
        );

        if (response.success === "success") {
          setSuccess("Message sent successfully!");
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setErrors({});
        } else {
          setSuccess(response.message || "Failed to send message.");
        }
      } catch (error) {
        setSuccess("Error connecting to server.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="contact-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span className="divider">/</span>
        <span className="active">{location.pathname.replace("/", "")}</span>
      </div>

      <div className="contact-section">
        <div className="contact-info">
          <div className="info-card">
            <div className="icon-wrapper">
              <FiPhoneCall size={22} />
            </div>
            <div>
              <h4>Call To Us</h4>
              <p>Available 24/7, 7 days a week</p>
              <p>Phone: +8801611112222</p>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-wrapper">
              <MdEmail size={22} />
            </div>
            <div>
              <h4>Write To Us</h4>
              <p>We’ll respond within 24 hours</p>
              <p>Email: customer@exclusive.com</p>
              <p>Support: support@exclusive.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="error">{errors.name}</p>}

              <input
                type="email"
                placeholder="Your Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}

              <input
                type="text"
                placeholder="Your Phone *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <textarea
              placeholder="Your Message *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.message && <p className="error">{errors.message}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
            {success && <p className="success">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
