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
  const [showLoader, setShowLoader] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [url, setUrl] = useState("");

  const maxRetries = 10;
  const retryInterval = 3000;
  const checkInterval = 5000;

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
          localStorage.setItem("initialLoad", "true");
        } else {
          handleBackendFailure();
        }
      }
    } catch (error) {
      console.error("Error checking backend health:", error);
      handleBackendFailure();
    }
  };

  const handleBackendFailure = () => {
    if (retryCount < maxRetries) {
      setRetryCount((prevRetryCount) => prevRetryCount + 1);
      setTimeout(checkBackendHealth, retryInterval);
    } else {
      console.error("Max retries reached. Backend is still not ready.");
      setShowLoader(true);
      localStorage.removeItem("initialLoad");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  };

  useEffect(() => {
    const initialLoad = localStorage.getItem("initialLoad");

    if (!initialLoad) {
      checkBackendHealth();
    } else {
      const monitorBackend = setInterval(checkBackendHealth, checkInterval);

      return () => clearInterval(monitorBackend);
    }
  }, [url]);

  useEffect(() => {}, [retryCount]);

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
    "Loading... Inviting the data fairies over for a quick chat.",
    "Loading... Fluffing the digital pillows for your comfort.",
    "Loading... Organizing a pixel parade in your honor.",
    "Loading... Spinning the yarn of digital wonder.",
    "Loading... Brewing a fresh pot of binary coffee.",
    "Loading... Aligning the stars of your digital galaxy.",
    "Loading... Synchronizing the cosmic code.",
    "Loading... Performing a digital dance-off with the servers.",
    "Loading... Entangling electrons with elegance.",
    "Loading... Crafting a digital symphony for your enjoyment.",
    "Loading... Filling the data ocean with virtual sunshine.",
    "Loading... Applying the finishing touches to your digital masterpiece.",
    "Loading... Wrangling virtual unicorns into formation.",
    "Loading... Setting up a digital carnival just for you.",
    "Loading... Tuning the digital orchestra for a perfect performance.",
    "Loading... Balancing the binary beams for optimal clarity.",
    "Loading... Programming a little magic into your data journey.",
    "Loading... Ensuring the digital stars are aligned perfectly.",
    "Loading... Launching a data space shuttle to your screen.",
    "Loading... Preparing a virtual feast of pixel delights.",
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
