import React from "react";
import "./about.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoShieldCheckmark } from "react-icons/io5";

import girlImage from "./../../assets/images/about_girl.jpg";
import boyImage from "./../../assets/images/about_boy.jpg";
import aboutimg from "./../../assets/images/Shopping bag concept illustration _ Free Vector.jpg";

const team = [
  {
    name: "Zena Ahmed",
    track: "Frontend",
    img: girlImage,
    github: "//",
    linkedin: "//",
  },
  {
    name: "Noura Mohamed",
    track: "Frontend",
    img: girlImage,
    github: "/",
    linkedin: "//",
  },
  {
    name: "Nehal Reda",
    track: "Frontend",
    img: girlImage,
    github: "/",
    linkedin: "/",
  },
  {
    name: "Menna Elgharabawi",
    track: "Backend",
    img: girlImage,
    github: "/",
    linkedin: "/",
  },
  {
    name: "Alaa",
    track: "Backend",
    img: girlImage,
    github: "/",
    linkedin: "/",
  },
  {
    name: "Khaled Mahmoud",
    track: "Backend",
    img: boyImage,
    github: "/",
    linkedin: "/",
  },
  {
    name: "Ahmed Ewaida",
    track: "Flutter",
    img: boyImage,
    github: "/",
    linkedin: "/",
  },
];

const About = () => {
  return (
    <div className="about">
      <div className="pageHeading  d-flex w-25 ">
        <Link to="/" className=" me-1">
          Home
        </Link>
        <span className="active ">{location.pathname}</span>
      </div>
      <section className="our-story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast pace. Exclusive offers a diverse assortment in categories
            ranging from consumer goods to lifestyle products.
          </p>
        </div>
        <div className="story-image">
          <img src={aboutimg} alt="Our Story" />
        </div>
      </section>

      <h2>Meet Our Team </h2>
      <div className="team-container">
        {team.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.img} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.track}</p>
            <div className="social-links">
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="icon"
              >
                <FaGithub />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="icon"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        ))}
      </div>

      <section className="features">
        <div className="feature-card">
          <div className="icon">
            <TbTruckDelivery />
          </div>
          <h3>FREE AND FAST DELIVERY</h3>
          <p>Free delivery for all orders over $140</p>
        </div>

        <div className="feature-card">
          <div className="icon">
            <RiCustomerServiceLine />
          </div>
          <h3>24/7 CUSTOMER SERVICE</h3>
          <p>Friendly 24/7 customer support</p>
        </div>

        <div className="feature-card">
          <div className="icon">
            <IoShieldCheckmark />
          </div>
          <h3>MONEY BACK GUARANTEE</h3>
          <p>We return money within 30 days</p>
        </div>
      </section>
    </div>
  );
};

export default About;
