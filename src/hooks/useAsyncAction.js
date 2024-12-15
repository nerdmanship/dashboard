'use client';

import { useState, useCallback } from 'react';

export function useAsyncAction() {
  const [isLoading, setIsLoading] = useState({});

  const executeAsync = useCallback(async (key, asyncFunction) => {
    // If already loading this action, prevent duplicate
    if (isLoading[key]) return;

    setIsLoading(prev => ({ ...prev, [key]: true }));
    try {
      await asyncFunction();
    } catch (error) {
      console.error(`Error executing ${key}:`, error);
      throw error;
    } finally {
      setIsLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [isLoading]);

  return {
    isLoading,
    executeAsync
  };
} 