import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-light text-center py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>About Asset Hub</h5>
                        <p>Asset Hub is a platform dedicated to providing valuable resources and information about financial assets and investments.</p>
                    </div>
                    <div className="col-md-6">
                        <h5>Contact Us</h5>
                        <p>Email: info@assethub.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <p>&copy; 2024 Asset Hub. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
