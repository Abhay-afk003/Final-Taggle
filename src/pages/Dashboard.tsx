import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Assuming your firebase config file is at '../lib/firebase'
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../lib/firebase';

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState('');
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        getDoc(userDocRef)
          .then((docSnap) => {
            if (docSnap.exists() && docSnap.data()?.name) {
 setUserName(docSnap.data().name);
            } else {
              setUserName(user.displayName || user.email || 'User');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
 setUserName(user.displayName || user.email || 'User'); // Fallback
          });
      } else {
        setUserName('Guest'); // Or handle unauthenticated state as needed
      }
    }, [user]);
    return () => unsubscribe(); // Clean up the listener on component unmount    
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white grid grid-cols-3 gap-4 p-4"> {/* Added padding */}
      {/* Left Column (wider) */}
      <div className="col-span-2">
        <h1 className="text-4xl font-bold mb-4">Hello {userName}!</h1>
 
        {/* ICP Details Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
 <h2 className="text-2xl font-semibold mb-4 text-purple-400">Your ICP details</h2>
 <div className="flex flex-col gap-4">
 <label htmlFor="industry" className="text-gray-400 text-sm">Industry</label>
 <input
 className="bg-gray-700 text-white p-2 rounded"
 type="text"
 id="industry"
 placeholder="e.g., Technology, Healthcare"
 />
 <label htmlFor="company-size" className="text-gray-400 text-sm">Company Size</label>
 <input
 className="bg-gray-700 text-white p-2 rounded"
 type="text"
 id="company-size"
 placeholder="e.g., 50-200 employees"
 />
 </div>
        </div>

        {/* Leads Section */}{" "}
        <div className="bg-gray-800 p-6 rounded-lg">
 <h2 className="text-2xl font-semibold mb-4 text-purple-400">Leads</h2>
 <div className="text-gray-300">
            {/* Placeholder for lead list or table */}
            <p>Your generated leads will appear here.</p>
 </div>
        </div>
      </div>
      {/* Right Column (narrower) */}
      <div className="col-span-1">
        {/* Right column content - could be for other details or left empty for now */}
      </div>
    </div>
  );
};

export default Dashboard;