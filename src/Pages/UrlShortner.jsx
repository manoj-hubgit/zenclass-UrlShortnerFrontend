import React, { useState } from 'react';
import axios from 'axios';


const UrlShortner = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://shortner-backend-c4dw.onrender.com/api/url/shorten', { longUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <p className="text-muted text-center mb-4">
                Shorty takes a long URL and converts it into a shorter, more manageable link. This is useful for sharing links on social media or in messages.
              </p>
              <h2 className="card-title text-center mb-4">URL Shortener</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter long URL"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Shorten URL</button>
                </div>
              </form>
              {shortUrl && (
                <div className="mt-4">
                  <h3>Short URL</h3>
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-break">
                    {shortUrl}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlShortner;
