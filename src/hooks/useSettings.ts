import { useState, useEffect } from 'react';
import { FirebaseService } from '../services/firebaseService';
import type { SiteSettings } from '../types';

export const useSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedSettings = await FirebaseService.getSettings();
      setSettings(fetchedSettings);
    } catch (err) {
      setError('Error loading settings');
      console.error('Error fetching settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    try {
      const success = await FirebaseService.updateSettings(newSettings);
      if (success) {
        await fetchSettings(); // Refresh settings
      }
      return success;
    } catch (err) {
      setError('Error updating settings');
      console.error('Error updating settings:', err);
      return false;
    }
  };

  const refreshSettings = () => {
    fetchSettings();
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    refreshSettings
  };
};