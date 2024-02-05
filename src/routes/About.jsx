import "./styles/About.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <header className="about-header">
        <nav className="about-header-links">
          <a className="about-header-anchor" href="#about">About</a>
          <a className="about-header-anchor" href="#why">Why</a>
          <a className="about-header-anchor" href="#features">Features</a>
          <a className="about-header-anchor" href="#technologies">Technology stack</a>
          <a className="about-header-anchor" href="#future">Future plans</a>
        </nav>
      </header>
      <main className="about-container">
        <h1 className="about-title" id="about">About</h1>
        <p className="about-paragraph">
          Welcome! Here, I'm excited to share insights about my first
          project—how it came to be, the technologies employed, and the
          motivations driving its creation.
        </p>
        <h1 className="about-title" id="why">Why</h1>
        <p className="about-paragraph">
          I jumped into this project for two reasons:
        </p>
        <ul className="about-ul">
          <li className="about-li">
            <span className="about-highlight">Learning Adventure</span>: My main
            goal was to dive deeper into React. I wanted hands-on experience
            with React, React Router, and testing because I'm aiming for a
            career as a programmer. No YouTube tutorials here—I wanted to figure
            it out on my own and make something cool!
          </li>
          <li className="about-li">
            <span className="about-highlight">Portfolio Building</span>: I also
            wanted to kickstart my portfolio with this project. As I'm eyeing
            future job opportunities in programming, having a project like this
            to showcase my skills is key. I built it from scratch, pouring my
            heart into every line of code. It's a reflection of my dedication
            and growth in the coding journey.
          </li>
        </ul>
        <h1 className="about-title" id="features">Features</h1>
        <p className="about-paragraph">
          Here is a list of all the features implemented!
        </p>
        <ul className="about-ul">
          <li className="about-li">
            <span className="about-highlight">Filters</span>: You can filter the
            products by categories, price and name
          </li>
          <li className="about-li">
            <span className="about-highlight">Pagination</span>: It includes
            automatic pagination, even if you filter, it updates automatically
            to the correct page
          </li>
          <li className="about-li">
            <span className="about-highlight">Shopping cart</span>: You can add
            products to your cart, it uses localStorage to store it, there you
            can have a preview of every product you added to your cart, you can
            modify the quantity of each product, and you can delete it
          </li>
          <li className="about-li">
            <span className="about-highlight">Preview</span>: You can see a
            preview of each product, it includes rating, price, category and a
            more detailed description
          </li>
          <li className="about-li">
            <span className="about-highlight">Contact</span>: It has a contact
            page where you can send me an email if you want to
          </li>
          <li className="about-li">
            <span className="about-highlight">Payment</span>: The products shown
            are not mine, however, there is a checkout process with actual
            payment, there you will be redirected to mercadopago to make the
            payment
          </li>
        </ul>
        <h1 className="about-title" id="technologies">Techology stack</h1>
        <p className="about-paragraph">It uses the following technologies:</p>
        <ul className="about-ul">
          <li className="about-li">
            <span className="about-highlight">React</span>: React forms the core
            of my frontend. I've built every aspect of the website, from the
            home page bar to the checkout process, using React. Its flexibility
            allows me to create a dynamic and responsive user interface that
            keeps visitors engaged.
          </li>
          <li className="about-li">
            <span className="about-highlight">
              React Router and React Router DOM
            </span>
            : I rely on React Router and React Router DOM to manage the routes
            within my application. They ensure that users can smoothly navigate
            between different pages and components. Whether users are exploring
            products or checking out, React Router ensures a seamless browsing
            experience.
          </li>
          <li className="about-li">
            <span className="about-highlight">EmailJS</span>: The contact page
            is powered by EmailJS, allowing users to reach out to me directly.
            Through a simple form where users can provide their name, email, and
            message, EmailJS seamlessly sends this information to my email. It's
            my way of facilitating direct communication with users.
          </li>
          <li className="about-li">
            <span className="about-highlight">Express</span>: To enable
            Mercadopago integration, I've set up a server using Express. It
            handles server-side operations, ensuring that the payment process is
            secure and reliable. Express simplifies the backend management,
            allowing me to focus on delivering a seamless user experience.
          </li>
          <li className="about-li">
            <span className="about-highlight">Mercadopago</span>: In the
            checkout process, Mercadopago plays a crucial role. When users reach
            the final step of their purchase, they encounter a Mercadopago
            button that directs them to the payment platform. This integration
            streamlines the transaction process, making it convenient and secure
            for users.
          </li>
        </ul>
        <h1 className="about-title" id="future">Future plans</h1>
        <p className="about-paragraph">
          Since this is my first project, I'm excited to keep building more!
          Check out my{" "}
          <a
            className="about-anchor"
            target="_blank"
            href="https://github.com/Eckry"
          >
            Github{" "}
          </a>
          or shoot me an{" "}
          <Link className="about-anchor" to={"/contact"}>
            email
          </Link>{" "}
          if you are curious of what i'm doing.
        </p>
      </main>
    </>
  );
}
