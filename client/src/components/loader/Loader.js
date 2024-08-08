import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert, Container, Row, Col } from "react-bootstrap";

const API_BASE_URLS = [
  process.env.REACT_APP_API_BASE_URL_DEV,
  process.env.REACT_APP_API_BASE_URL_PROD,
];

const checkBackendUrlAccessibility = async (url) => {
  try {
    const response = await axios.get(`${url}/users/help`);
    if (
      response.status === 200 &&
      response.data.message === "This is the help message for your API."
    ) {
      return true;
    } else {
      throw new Error(`Unexpected response from ${url}`);
    }
  } catch (error) {
    console.error(`Error with ${url}: ${error.message}`);
    return false;
  }
};

const getBackendUrl = async () => {
  for (const url of API_BASE_URLS) {
    if (await checkBackendUrlAccessibility(url)) {
      return url;
    }
  }
  throw new Error("No accessible backend URL found.");
};

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [url, setUrl] = useState("");
  const maxRetries = 5;
  const retryInterval = 3000;

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
      console.error("Backend check error:", error);
      handleRetry();
    }
  };

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(retryCount + 1);
      setTimeout(checkBackendHealth, retryInterval);
    } else {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
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
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark bg-opacity-75 text-white">
          <Row className="text-center mb-4">
            <Col>
              <Spinner animation="border" variant="primary" style={{ width: "4rem", height: "4rem" }} />
              <h4 className="mt-3">{randomMessage}</h4>
              <Alert variant="info" className="mt-3">
                Please wait while we ensure everything is set up correctly. This might take a few moments.
              </Alert>
              {retryCount > 0 && retryCount < maxRetries && (
                <Alert variant="warning" className="mt-3">
                  Attempting to reconnect... (Retry {retryCount} of {maxRetries})
                </Alert>
              )}
              {retryCount === maxRetries && (
                <Alert variant="danger" className="mt-3">
                  Unable to connect to the server. Please try again later.
                </Alert>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="progress w-75 mb-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                  role="progressbar"
                  style={{ width: `${(retryCount / maxRetries) * 100}%` }}
                  aria-valuenow={(retryCount / maxRetries) * 100}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="text-muted">
                Ensuring the backend is available for a smooth experience. Your patience is appreciated.
              </p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Loader;
