import React from "react";
import "./about.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoShieldCheckmark } from "react-icons/io5";

import girlImage from "../../assets/images/about_girl.jpg";
import boyImage from "../../assets/images/about_boy.jpg";
import aboutimg from "../../assets/images/Shopping bag concept illustration _ Free Vector.jpg";

const team = [
  { name: "Zena Ahmed", track: "Frontend", img: girlImage, github: "/", linkedin: "/" },
  { name: "Noura Mohamed", track: "Frontend", img: girlImage, github: "/", linkedin: "/" },
  { name: "Nehal Reda", track: "Frontend", img: girlImage, github: "/", linkedin: "/" },
  { name: "Menna Elgharabawi", track: "Backend", img: girlImage, github: "/", linkedin: "/" },
  { name: "Alaa", track: "Backend", img: girlImage, github: "/", linkedin: "/" },
  { name: "Khaled Mahmoud", track: "Backend", img: boyImage, github: "/", linkedin: "/" },
  { name: "Ahmed Ewaida", track: "Flutter", img: boyImage, github: "/", linkedin: "/" },
];

const About = () => {
  const location = useLocation();

  return (
    <div className="about container">
     <div className="breadcrumb">
        <Link to="/">Home</Link> <span className="divider">/</span>
        <span className="active">{location.pathname.replace("/", "")}</span>
      </div>

      {/* --- Our Story --- */}
      <section className="our-story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            Founded in 2015, <span className="brand">Exclusive</span> is South Asia’s premier online shopping platform,
            offering a seamless experience for millions of customers. With over 10,000 sellers and 300+ brands,
            we’re committed to redefining online retail with trust and innovation.
          </p>
          <p>
            Our catalog spans everything from electronics to lifestyle, ensuring every shopper finds exactly what they need —
            fast, easy, and secure.
          </p>
        </div>
        <div className="story-image">
          <img src={aboutimg} alt="Our Story" />
        </div>
      </section>

      {/* --- Team --- */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-container">
          {team.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.track}</p>
              <div className="social-links">
                <a href={member.github} target="_blank" rel="noreferrer">
                  <FaGithub />
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Features --- */}
      <section className="features">
        <div className="feature-card">
          <div className="icon"><TbTruckDelivery /></div>
          <h3>Free & Fast Delivery</h3>
          <p>Free delivery on all orders over $140</p>
        </div>
        <div className="feature-card">
          <div className="icon"><RiCustomerServiceLine /></div>
          <h3>24/7 Customer Support</h3>
          <p>Always here to help — day or night</p>
        </div>
        <div className="feature-card">
          <div className="icon"><IoShieldCheckmark /></div>
          <h3>Money-Back Guarantee</h3>
          <p>Refunds within 30 days of purchase</p>
        </div>
      </section>
    </div>
  );
};

export default About;
