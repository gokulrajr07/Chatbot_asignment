import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Scrapping.css";
// Helper function to simulate scraping
const fetchWebsiteMetaDescription = async (url) => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock meta description fetched from a website
      resolve("This is a mock meta description fetched from the website.");
    }, 2000);
  });
};

const Scrapping = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [scrapingStatus, setScrapingStatus] = useState(""); // 'pending', 'completed', 'error'
  const [webPages, setWebPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrapingInProgress, setIsScrapingInProgress] = useState(false);

  useEffect(() => {
    if (companyWebsite) {
      fetchMetaDescription(companyWebsite);
    }
  }, [companyWebsite]);

  // Simulate scraping the website and extracting meta description
  const fetchMetaDescription = async (url) => {
    setIsLoading(true);
    setScrapingStatus("pending");
    try {
      const description = await fetchWebsiteMetaDescription(url);
      setMetaDescription(description);
      setScrapingStatus("completed");
      setIsLoading(false);
    } catch (error) {
      setScrapingStatus("error");
      setIsLoading(false);
    }
  };

  // Simulate scraping multiple pages of the website
  const handleChatBot = () => {
    navigate("/chatbot");
  };

  const fetchWebPages = async () => {
    setIsScrapingInProgress(true);
    setWebPages([
      { url: "/home", status: "pending" },
      { url: "/about", status: "pending" },
      { url: "/contact", status: "pending" },
    ]);

    setTimeout(() => {
      setWebPages((prevPages) =>
        prevPages.map((page) =>
          page.status === "pending" ? { ...page, status: "scraped" } : page
        )
      );
      setIsScrapingInProgress(false);
    }, 3000);
  };

  // Handle webpage click to show scraped data (mock)
  const handleWebPageClick = (pageUrl) => {
    alert(`Showing content for ${pageUrl}`);
    // Here, you can show the modal with detailed scraped data
  };

  // Enable the "Proceed to Next Step" button when scraping is done
  const isProceedDisabled =
    scrapingStatus !== "completed" || isScrapingInProgress;

  return (
    <div className="container">
      <div className="top-section">
        <h1>Let’s set up your company information.</h1>
      </div>

      <form>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            required
          />
        </div>

        <div className="form-group">
          <label>Company Website URL</label>
          <div className="url-container">
            <input
              type="url"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="Enter your company website URL"
              required
            />
            {isLoading && <span className="loader">Loading...</span>}
          </div>
          {scrapingStatus === "completed" && (
            <small>
              Meta description successfully fetched from your website.
            </small>
          )}
        </div>

        <div className="form-group">
          <label>Company Description</label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows="4"
            placeholder="Enter or edit your company description"
            required
          />
        </div>

        <div className="scraping-status">
          <h3>Scraped Webpages</h3>
          <button
            type="button"
            onClick={fetchWebPages}
            disabled={isScrapingInProgress}
          >
            {isScrapingInProgress
              ? "Scraping in Progress..."
              : "Start Scraping Website"}
          </button>
          <table>
            <thead>
              <tr>
                <th>Page URL</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {webPages.map((page, index) => (
                <tr key={index}>
                  <td>{page.url}</td>
                  <td>
                    <span>{page.status}</span>
                    <button
                      type="button"
                      onClick={() => handleWebPageClick(page.url)}
                    >
                      View Data
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          onClick={() => handleChatBot()}
          disabled={isProceedDisabled}
        >
          Proceed to Next Step
        </button>
      </form>
    </div>
  );
};

export default Scrapping;
