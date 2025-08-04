import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ScrapingComponentProps {
  industry: string;
  companySize: string;
}

const ScrapingComponent: React.FC<ScrapingComponentProps> = ({ industry, companySize }) => {
  const [isScraping, setIsScraping] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    setIsScraping(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5001/scrape', {
        industry,
        companySize,
      });
      setProfiles(response.data);
    } catch (err) {
      setError('Failed to scrape data. Please try again.');
      console.error(err);
    } finally {
      setIsScraping(false);
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={handleScrape}
        disabled={isScraping || !industry || !companySize}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
      >
        {isScraping ? 'Scraping...' : 'Scrape LinkedIn Profiles'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {profiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Scraped Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p className="font-bold">{profile.name}</p>
                <p className="text-sm text-gray-400">{profile.title}</p>
                <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                  View Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrapingComponent;
