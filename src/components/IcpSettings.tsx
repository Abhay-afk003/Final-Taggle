import React, { useState } from 'react';

interface IcpSettingsProps {
  // Define any props if needed
}

interface Competitor {
  id: string; // Or number, depending on your data structure
  name: string;
  // Add other competitor details if necessary (e.g., website, industry)
}

const IcpSettings: React.FC<IcpSettingsProps> = () => {
  const [targetAudienceDescription, setTargetAudienceDescription] = useState('');
  const [minAge, setMinAge] = useState<number | string>('');
  const [maxAge, setMaxAge] = useState<number | string>('');
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const [searchResults, setSearchResults] = useState<Competitor[]>([]); // New state for search results
  const [isSearching, setIsSearching] = useState(false); // New state for search loading indicator

  // Placeholder for handling competitor search with '@'
  const handleCompetitorSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if the input contains '@'
    if (value.includes('@')) {
      setSearchQuery(value.substring(value.indexOf('@') + 1)); // Extract text after '@'
    } else {
      setSearchQuery(''); // Clear search query if '@' is removed
    }

    // Always update the input value state
    setCompetitorSearchInput(value);
  };

  // Placeholder for adding a selected competitor (after search)
  const addCompetitor = (competitor: Competitor) => {
    setCompetitors([...competitors, competitor]);
    setCompetitorSearchInput(''); // Clear search input after adding
  };

  // Placeholder for removing a competitor
  const removeCompetitor = (competitorId: string | number) => {
    setCompetitors(competitors.filter(comp => comp.id !== competitorId));
  };

  // Placeholder function to perform the competitor search
  const performCompetitorSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]); // Clear results if query is empty
      return;
    }

    setIsSearching(true);
    console.log(`Performing placeholder search for: ${query}`);

    // TODO: Replace with actual API call to your backend or external service
    // Simulate a network request with dummy data
    await new Promise(resolve => setTimeout(resolve, 500));
    setSearchResults([
      { id: '1', name: `${query} Competitor A` },
      { id: '2', name: `${query} Competitor B` },
    ]);
    setIsSearching(false);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    console.log('Saving ICP settings:', {
      targetAudienceDescription,
      minAge,
      maxAge,
      competitors
    });
    // In a real implementation, you would save this data to your backend/database
    // await saveIcpSettingsToDatabase({ targetAudienceDescription, minAge, maxAge, competitors });
    setIsSaving(false);
    // Optionally show a success message
  };

  // Effect to trigger search when searchQuery changes
  useEffect(() => {
    performCompetitorSearch(searchQuery);
    // Optionally show a success message
  };

  return (
    <div className="icp-settings-container">
      <h2 className="text-2xl font-bold mb-4">ICP Settings</h2>

      {/* Target Audience */}
      <div className="mb-6">
        <label htmlFor="targetAudienceDescription" className="block text-sm font-medium text-gray-700 mb-1">Target Audience Description</label>
        <textarea
          id="targetAudienceDescription"
          rows={4}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
          value={targetAudienceDescription}
          onChange={(e) => setTargetAudienceDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Age Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience Age Range</label>
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="minAge" className="sr-only">Minimum Age</label>
            <input
              type="number"
              id="minAge"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Min Age"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              min="0"
            />
          </div>
          <span>to</span>
          <div>
            <label htmlFor="maxAge" className="sr-only">Maximum Age</label>
            <input
              type="number"
              id="maxAge"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Max Age"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Competitors */}
      <div className="mb-6">
        <label htmlFor="competitorSearch" className="block text-sm font-medium text-gray-700 mb-1">Competitors (search with @)</label>
        <input
          type="text"
          id="competitorSearch"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2 mb-2"
          placeholder="Search or type competitor name (e.g., @HubSpot)"
          value={competitorSearchInput}
          onChange={handleCompetitorSearchInputChange}
        />

        {/* Display search results */}
        {searchQuery && (
          <div className="border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
            {isSearching ? (
              <div className="p-2 text-center text-gray-500">Searching...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map(result => (
                <div
                  key={result.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                  onClick={() => addCompetitor(result)}
                >
                  {result.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">No results found.</div>
            )}
          </div>
        )}

        {/* Display added competitors */}
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Added Competitors:</h4>
          {competitors.length === 0 ? (
            <p className="text-sm text-gray-500">No competitors added yet.</p>
          ) : (
            <ul className="list-disc list-inside">
              {competitors.map(comp => (
                <li key={comp.id} className="text-sm text-gray-900 flex items-center justify-between">
                  {comp.name}
                  <button
                    onClick={() => removeCompetitor(comp.id)}
                    className="ml-2 text-red-600 hover:text-red-900 text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div>
        <button
          type="button"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleSaveSettings}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default IcpSettings;