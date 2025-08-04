import React from 'react';
import ScrapingComponent from './ScrapingComponent';

interface IcpSettingsProps {
  industry: string;
  setIndustry: (industry: string) => void;
  companySize: string;
  setCompanySize: (companySize: string) => void;
}

const IcpSettings: React.FC<IcpSettingsProps> = ({
  industry,
  setIndustry,
  companySize,
  setCompanySize,
}) => {
  return (
    <div className="scraping-container">
      <h2 className="text-2xl font-bold mb-4">Your ICP Details</h2>

      <div className="mb-6">
        <label htmlFor="industry" className="block text-sm font-medium text-gray-400 mb-1">Industry</label>
        <input
          type="text"
          id="industry"
          className="shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-600 rounded-md p-2"
          placeholder="e.g., SaaS, E-commerce"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="companySize" className="block text-sm font-medium text-gray-400 mb-1">Company Size</label>
        <input
          type="text"
          id="companySize"
          className="shadow-sm bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-600 rounded-md p-2"
          placeholder="e.g., 10-50 employees"
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
        />
      </div>

      <ScrapingComponent industry={industry} companySize={companySize} />
    </div>
  );
};

export default IcpSettings;
