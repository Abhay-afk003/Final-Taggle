import { useState } from 'react';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

interface WaitlistData {
  email: string;
  timestamp: Timestamp;
  source?: string;
  userAgent?: string;
}

export const useWaitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const joinWaitlist = async (email: string): Promise<boolean> => {
    if (isSubmitting) return false;

    setIsSubmitting(true);
    const loadingToast = toast.loading('Adding you to the waitlist...');

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Check if email already exists (optional - to prevent duplicates)
      const existingQuery = query(
        collection(db, 'waitlist'),
        where('email', '==', email.toLowerCase().trim())
      );
      
      const existingDocs = await getDocs(existingQuery);
      
      if (!existingDocs.empty) {
        toast.dismiss(loadingToast);
        toast.error('This email is already on our waitlist!', {
          duration: 4000,
        });
        return false;
      }

      // Prepare waitlist data
      const waitlistData: WaitlistData = {
        email: email.toLowerCase().trim(),
        timestamp: Timestamp.now(),
        source: 'hero_section',
        userAgent: navigator.userAgent,
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'waitlist'), waitlistData);
      
      console.log('Successfully added to waitlist with ID:', docRef.id);
      
      toast.dismiss(loadingToast);
      toast.success('🎉 Welcome to the waitlist! We\'ll notify you when we launch.', {
        duration: 6000,
      });

      return true;

    } catch (error: any) {
      console.error('Error adding to waitlist:', error);
      
      toast.dismiss(loadingToast);
      
      // Handle specific Firebase errors
      let errorMessage = 'Failed to join waitlist. Please try again.';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check your internet connection and try again.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Please try again in a moment.';
      } else if (error.message && error.message.includes('valid email')) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        duration: 5000,
      });

      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWaitlistCount = async (): Promise<number> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'waitlist'));
      return 134 + querySnapshot.size; // Base count + actual count
    } catch (error) {
      console.error('Error fetching waitlist count:', error);
      return 134; // Return base count on error
    }
  };

  return {
    joinWaitlist,
    getWaitlistCount,
    isSubmitting,
  };
};