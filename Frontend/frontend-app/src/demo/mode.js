// True on the Netlify build (set in netlify.toml), where no backend services run.
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";
