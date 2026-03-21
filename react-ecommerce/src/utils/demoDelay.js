/** Artificial delay so loading/skeleton states are easy to demo (refresh page). */
export const DEMO_FETCH_DELAY_MS = 1000;

export function demoFetchDelay(ms = DEMO_FETCH_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
