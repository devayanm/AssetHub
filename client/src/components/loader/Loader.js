import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URLS = [
  process.env.REACT_APP_API_BASE_URL_PROD,
  process.env.REACT_APP_API_BASE_URL_DEV,
];

const checkBackendUrlAccessibility = async (url) => {
  try {
    const response = await axios.get(`${url}/users/help`);
    if (
      response.status === 200 &&
      response.data.message === "This is the help message for your API."
    ) {
      console.log(`Backend URL ${url} is accessible.`);
      return true;
    } else {
      throw new Error(`Backend URL ${url} returned unexpected response.`);
    }
  } catch (error) {
    console.error(`Error accessing backend URL ${url}: ${error.message}`);
    return false;
  }
};

const getBackendUrl = async () => {
  try {
    for (const url of API_BASE_URLS) {
      if (await checkBackendUrlAccessibility(url)) {
        console.log("Using backend URL:", url);
        return url;
      }
    }
    throw new Error("No accessible backend URL found.");
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const Loader = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 5;
  const retryInterval = 3000;
  const [url, setUrl] = useState("");

  const checkBackendHealth = async () => {
    try {
      if (!url) {
        const backendUrl = await getBackendUrl();
        setUrl(backendUrl);
      }

      if (url) {
        const response = await axios.get(`${url}/users/help`);
        if (response.status === 200) {
          setShowLoader(false);
        } else {
          handleRetry();
        }
      }
    } catch (error) {
      console.error("Error checking backend health:", error);
      handleRetry();
    }
  };

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(retryCount + 1);
      setTimeout(checkBackendHealth, retryInterval);
    } else {
      console.error("Max retries reached. Backend is still not ready.");
      setShowLoader(false);
    }
  };

  useEffect(() => {
    const initialLoad = localStorage.getItem("initialLoad");

    if (!initialLoad) {
      localStorage.setItem("initialLoad", "true");
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 5000); 

      checkBackendHealth();

      return () => clearTimeout(timer); 
    } else {
      checkBackendHealth();
    }
  }, [url]);

  const loadingMessages = [
    "Loading... Grab some coffee, this might take a while.",
    "Loading... Please hold on, the pixels are aligning perfectly.",
    "Loading... Counting backwards from infinity.",
    "Loading... Entertaining quantum particles.",
    "Loading... Assembling digital minions.",
    "Loading... Making sure all the 1s and 0s are in the right order.",
    "Loading... Summoning the internet spirits.",
    "Loading... Untangling the digital spaghetti.",
    "Loading... Just fetching some digital sunshine.",
    "Loading... Polishing pixels for maximum shine.",
    "Loading... Teaching electrons to dance.",
    "Loading... Convincing the server hamsters to run faster.",
    "Loading... Searching for the lost sock in the data stream.",
    "Loading... Coaxing ones and zeros into harmony.",
    "Loading... Digitally arranging a surprise party for your data.",
    "Loading... Spinning the wheel of digital fortune.",
    "Loading... Waiting for the bits to settle down.",
    "Loading... Crafting the perfect digital bouquet of pixels.",
    "Loading... Giving the algorithm a pep talk.",
    "Loading... Just catching up with the interwebs.",
  ];

  const randomMessage =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <>
      {showLoader && (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark bg-opacity-75 text-white">
          <div className="text-center mb-4">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              style={{ width: "4rem", height: "4rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4>{randomMessage}</h4>
          </div>
          <div className="progress w-75 mb-3">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-info"
              role="progressbar"
              style={{ width: "75%" }}
              aria-valuenow="75"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <p className="text-muted">
            Please wait while we prepare something amazing for you...
          </p>
          {retryCount > 0 && retryCount < maxRetries && (
            <p className="text-warning">
              Attempting to reconnect... (Retry {retryCount} of {maxRetries})
            </p>
          )}
          {retryCount >= maxRetries && (
            <p className="text-danger">
              Unable to connect to the server. Please try again later.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Loader;
