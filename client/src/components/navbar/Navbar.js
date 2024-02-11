import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import "bootstrap/dist/css/bootstrap.min.css";
import images from "../../constants/images.js";
import './Navbar.css';

const Navbar = ({ links , isLoggedIn}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMenuHandler = () => {
        setToggleMenu(prevState => !prevState);
    };

    return (
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <div className="overlay"></div>
                <img src={images.logo} alt="logo" />
            </div>
            {windowWidth < 601 ? (
                <><div className="log_in">
                    {!isLoggedIn &&(
                        <><button type="button" class="btn">log in</button>
                        </>
                    )}
                </div>
                <div className="hamburger-menu">
                    {toggleMenu ? (
                        <ImCross className="overlay__close" onClick={toggleMenuHandler} />
                    ) : (
                        <RxHamburgerMenu className="Burger" onClick={toggleMenuHandler} />
                    )}
                    {toggleMenu && (
                        <div className="burger__list">
                            <ul className="burger__list-links">
                                {links.map((link, index) => (
                                    <li key={index} className="bl" id={index}>
                                        <a href={link.url}>{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div></>
            ) : (
                <div>
                   <div className="log_in">
                       {!isLoggedIn &&(
                           <><button class="btn2">log in</button>
                           </>
                       )}
                   </div>
                   <ul className="app__navbar-links">
                       {links.map((link, index) => (
                           <li className="p__opensans" key={index}>
                               <a href={link.url}>{link.text}</a>
                           </li>
                       ))}
                   </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
