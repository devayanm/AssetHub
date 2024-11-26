import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URLS = [
  process.env.REACT_APP_API_BASE_URL_PROD,
  process.env.REACT_APP_API_BASE_URL_DEV,
];

const checkBackendUrlAccessibility = async (url) => {
  console.log(`Checking accessibility for ${url}`);
  try {
    const response = await axios.get(`${url}/users/help`);
    console.log(`Response from ${url}:`, response);
    return (
      response.status === 200 &&
      response.data.message === "This is the help message for your API."
    );
  } catch (error) {
    console.error(`Error accessing ${url}: ${error.message}`);
    return false;
  }
};

const getBackendUrl = async () => {
  console.log("Trying to get a working backend URL...");
  for (const url of API_BASE_URLS) {
    if (await checkBackendUrlAccessibility(url)) {
      console.log(`Accessible backend URL found: ${url}`);
      return url;
    }
  }
  console.error("No accessible backend URL found.");
  throw new Error("No accessible backend URL found.");
};

const pingServer = async (url) => {
  console.log(`Pinging server at ${url}`);
  try {
    await axios.get(`${url}/users/help`);
    return true;
  } catch (error) {
    console.error(`Ping error for ${url}: ${error.message}`);
    return false;
  }
};

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [url, setUrl] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const maxRetries = 10;
  const retryInterval = 3000; // 3 seconds
  const checkInterval = 5000; // 5 seconds
  const pingInterval = 15000; // 15 seconds

  // Check the backend accessibility for the initial loader
  const checkBackendHealth = async () => {
    console.log("Checking backend health...");
    try {
      if (!url) {
        console.log("Fetching a backend URL...");
        const backendUrl = await getBackendUrl();
        setUrl(backendUrl);
      }

      if (url) {
        const isOnline = await checkBackendUrlAccessibility(url);
        console.log(`Backend URL ${url} is ${isOnline ? "online" : "offline"}`);
        if (isOnline) {
          handleBackendOnline();
        } else {
          handleBackendFailure();
        }
      }
    } catch (error) {
      console.error("Error checking backend health:", error);
      handleBackendFailure();
    }
  };

  const handleBackendOnline = () => {
    setShowLoader(false);
    if (isInitialLoad) {
      sessionStorage.setItem("initialLoadComplete", "true");
      setIsInitialLoad(false);
      console.log("Initial load completed. Session storage updated.");
    }
  };

  const handleBackendFailure = () => {
    if (retryCount < maxRetries) {
      setRetryCount((prevRetryCount) => prevRetryCount + 1);
      console.log(
        `Retrying in ${retryInterval / 1000} seconds... (Retry ${
          retryCount + 1
        })`
      );
      setTimeout(checkBackendHealth, retryInterval);
    } else {
      console.error("Max retries reached. Backend is still not ready.");
      triggerPageReload();
    }
  };

  const triggerPageReload = () => {
    setShowLoader(true);
    setTimeout(() => {
      console.log("Refreshing page...");
      window.location.reload();
    }, 5000);
  };

  // Continuous monitoring of the backend status
  const monitorServer = async () => {
    console.log("Monitoring server...");
    try {
      if (url) {
        const isOnline = await pingServer(url);
        if (!isOnline) {
          console.log("Server is down. Refreshing page...");
          sessionStorage.removeItem("initialLoadComplete");
          setIsInitialLoad(true);
          setRetryCount(0);
          triggerPageReload();
        }
      }
    } catch (error) {
      console.error("Error monitoring server:", error);
    }
  };

  useEffect(() => {
    console.log("Component mounted or URL changed.");
    const initialLoadComplete = sessionStorage.getItem("initialLoadComplete");

    if (!initialLoadComplete) {
      console.log("Initial load flag not set. Checking backend health...");
      checkBackendHealth();
    } else {
      console.log("Initial load flag set. Hiding loader.");
      setShowLoader(false);
    }

    const monitorBackend = setInterval(checkBackendHealth, checkInterval);
    const monitorServerInterval = setInterval(monitorServer, pingInterval);

    const handleBeforeUnload = () => {
      console.log("Removing initial load flag before unload...");
      sessionStorage.removeItem("initialLoadComplete");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(monitorBackend);
      clearInterval(monitorServerInterval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      console.log("Cleanup on component unmount.");
    };
  }, [url]);

  useEffect(() => {
    if (!showLoader && !isInitialLoad) {
      console.log("Setting up server check interval...");
      const serverCheck = setInterval(() => {
        if (retryCount >= maxRetries) {
          console.log("Retry count exceeded. Showing loader...");
          setShowLoader(true);
          setRetryCount(0);
        }
      }, retryInterval);

      return () => {
        clearInterval(serverCheck);
        console.log("Server check interval cleared.");
      };
    }
  }, [showLoader, retryCount, isInitialLoad]);

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
