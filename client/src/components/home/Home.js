import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <h2>Welcome to Asset Hub</h2>
            <p>Explore and manage your assets with ease.</p>

            <div>
                <h3>hello</h3>
                <ul>
                    <li>
                        <Link to="/land-registration">Register Land</Link>
                    </li>
                    <li>
                        <Link to="/vehicle-registration">Register Vehicle</Link>
                    </li>
                    <li>
                        <Link to="/land-marketplace">Explore Land Marketplace</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h3>Featured Listings</h3>
            </div>
        </div>
    );
};

export default Home;
