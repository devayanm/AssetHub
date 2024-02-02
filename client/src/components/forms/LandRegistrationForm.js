import React, { useState } from "react";

const LandRegistrationForm = ({ contract }) => {
    const [landName, setLandName] = useState("");
    const [location, setLocation] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState("");

    const handleRegisterLand = async () => {
        try {
            // Call the registerLand function from your contract
            // Replace with your actual function and parameters
            const transaction = await contract.registerLand(landName, location);

            // Process the transaction result
            if (transaction) {
                setRegistrationStatus("Land registration successful!");
            } else {
                setRegistrationStatus("Land registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error registering land:", error.message);
            setRegistrationStatus("Land registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Land Registration Form</h2>
            <form>
                <label htmlFor="landName">Land Name:</label>
                <input
                    type="text"
                    id="landName"
                    value={landName}
                    onChange={(e) => setLandName(e.target.value)}
                />
                <br />
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <br />
                <button type="button" onClick={handleRegisterLand}>
                    Register Land
                </button>
            </form>
            <div>{registrationStatus && <p>{registrationStatus}</p>}</div>
        </div>
    );
};

export default LandRegistrationForm;
