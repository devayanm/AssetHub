import { useEffect } from 'react';

const useContractInteractions = (contracts, accounts) => {
    const handleLandRegistration = async () => {
        try {
            await contracts.landRegistration.methods.registerLand(1).send({ from: accounts[0] }); // Assuming landId is 1
            console.log('Land registration successful!');
        } catch (error) {
            console.error('Error registering land:', error);
        }
    };

    const handleVehicleRegistration = async () => {
        try {
            await contracts.vehicleRegistration.methods.registerVehicle(1).send({ from: accounts[0] }); // Assuming vehicleId is 1
            console.log('Vehicle registration successful!');
        } catch (error) {
            console.error('Error registering vehicle:', error);
        }
    };

    useEffect(() => {
    }, [contracts, accounts]);

    return { handleLandRegistration, handleVehicleRegistration };
};

export default useContractInteractions;
