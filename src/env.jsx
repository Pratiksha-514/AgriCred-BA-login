// env.ts
const isLocal = window.location.hostname === "localhost";

// Agriculture Entity
export const BaLoginUrl = isLocal
  ? "http://localhost:5174/" // Local development
  : "https://demo-agricred-businessaccount.azurewebsites.net/"; // Azure production

export const BaRegisterUrl = isLocal
  ? "http://localhost:5173/"
  : "https://demo-agricred-businessaccount-register.azurewebsites.net/";

// Investor URLs (unchanged)
export const InvestorLoginUrl = "https://demo-agricred-investor.azurewebsites.net/";
export const InvestorRegisterUrl = "https://demo-agricred-investor-register.azurewebsites.net/";
