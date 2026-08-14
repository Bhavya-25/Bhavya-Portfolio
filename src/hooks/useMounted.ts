"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True only after the client has hydrated — the React-recommended
 * replacement for the `useState(false) + useEffect(() => setTrue)` pattern. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
