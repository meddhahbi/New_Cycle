import React, { useState, useEffect } from 'react';

const Scraped = () => {
  const [articles, setArticles] = useState([]);
  const [showMore, setShowMore] = useState(false); // State to control whether to show more articles

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/scrape`); // Assumes backend is running on the same host and port
        const data = await response.json();
        console.log('Fetched data:', data); // Log fetched data for debugging
        setArticles(data.articles);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle "Show More" button click
  const handleShowMoreClick = () => {
    setShowMore(true); // Set showMore state to true to display all articles
  };

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.slice(0, showMore ? articles.length : 10).map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </li>
        ))}
      </ul>
      {!showMore && articles.length > 10 && (
        <button   onClick={handleShowMoreClick}>Show More</button>
      )}
    </div>
  );
};

export default Scraped;