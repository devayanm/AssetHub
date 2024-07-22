import React, { useEffect, useState } from "react";

const Loader = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem('visited');

    if (isFirstVisit) {
      setShowLoader(true);
      sessionStorage.setItem('visited', 'true');
      
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, []);

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
        </div>
      )}
    </>
  );
};

export default Loader;
