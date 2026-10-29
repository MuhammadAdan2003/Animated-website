import { useSyncExternalStore } from 'react';

// Module-level singleton state across the application lifecycle
let isLoaderFinished = false;
const listeners = new Set();

/**
 * Updates the global loader status and notifies all subscribers.
 * @param {boolean} finished
 */
export function setLoaderFinished(finished) {
  const next = Boolean(finished);
  if (isLoaderFinished !== next) {
    isLoaderFinished = next;
    listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('Error in loader listener:', err);
      }
    });
  }
}

/**
 * Synchronous getter for current loader state.
 * @returns {boolean}
 */
export function getLoaderFinished() {
  return isLoaderFinished;
}

/**
 * React hook to subscribe to the loader completion state.
 * Returns true once the initial preloader has lifted its curtain.
 * @returns {boolean}
 */
export function useLoaderFinished() {
  return useSyncExternalStore(
    (callback) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    getLoaderFinished,
    () => false
  );
}

