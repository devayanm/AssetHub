import React, { useState } from "react";

const VehicleRegistrationForm = ({ contract }) => {
    const [vehicleName, setVehicleName] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState("");

    const handleRegisterVehicle = async () => {
        try {
            // Call the registerVehicle function from your contract
            // Replace with your actual function and parameters
            const transaction = await contract.registerVehicle(
                vehicleName,
                registrationNumber
            );

            // Process the transaction result
            if (transaction) {
                setRegistrationStatus("Vehicle registration successful!");
            } else {
                setRegistrationStatus("Vehicle registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error registering vehicle:", error.message);
            setRegistrationStatus("Vehicle registration failed. Please try again.");
        }
    };

    return (
        <div>
            <h2>Vehicle Registration Form</h2>
            <form>
                <label htmlFor="vehicleName">Vehicle Name:</label>
                <input
                    type="text"
                    id="vehicleName"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                />
                <br />
                <label htmlFor="registrationNumber">Registration Number:</label>
                <input
                    type="text"
                    id="registrationNumber"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                />
                <br />
                <button type="button" onClick={handleRegisterVehicle}>
                    Register Vehicle
                </button>
            </form>
            <div>{registrationStatus && <p>{registrationStatus}</p>}</div>
        </div>
    );
};

export default VehicleRegistrationForm;
