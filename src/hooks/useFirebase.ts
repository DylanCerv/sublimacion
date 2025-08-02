import { useState, useEffect } from 'react';
import { FirebaseService } from '../services/firebaseService';
import type { Shirt, Collection } from '../types';

interface UseFirebaseState {
    shirts: Shirt[];
    collections: Collection[];
    isLoading: boolean;
    error: string | null;
}

export const useFirebase = () => {
    const [state, setState] = useState<UseFirebaseState>({
        shirts: [],
        collections: [],
        isLoading: true,
        error: null
    });

    const loadData = async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));

            const [shirtsData, collectionsData] = await Promise.all([
                FirebaseService.getShirts(),
                FirebaseService.getCollections()
            ]);

            setState({
                shirts: shirtsData,
                collections: collectionsData,
                isLoading: false,
                error: null
            });
        } catch (error) {
            console.error('Error loading data:', error);
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to load data'
            }));
        }
    };

    const refreshData = () => {
        loadData();
    };

    useEffect(() => {
        loadData();
    }, []);

    return {
        ...state,
        refreshData
    };
};

// Hook for getting a single shirt
export const useShirt = (id: string) => {
    const [shirt, setShirt] = useState<Shirt | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchShirt = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const shirtData = await FirebaseService.getShirtById(id);
                setShirt(shirtData);
            } catch (error) {
                console.error('Error fetching shirt:', error);
                setError(error instanceof Error ? error.message : 'Failed to load shirt');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchShirt();
        }
    }, [id]);

    return { shirt, isLoading, error };
};