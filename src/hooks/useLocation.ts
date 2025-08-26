"use client";

import { useCallback } from "react";

export function useLocation() {
  const getCurrentLocation = useCallback(
    (
      onSuccess: (location: string) => void,
      onError: (error: string) => void
    ) => {
      if (typeof navigator === "undefined" || !navigator.geolocation) {
        onError?.("Geolocation is not supported.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSuccess?.(
            `${position.coords.latitude},${position.coords.longitude}`
          );
        },
        (error) => {
          onError?.(error.message);
        }
      );
    },
    []
  );

  return { getCurrentLocation };
}
