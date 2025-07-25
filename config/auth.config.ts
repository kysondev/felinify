export const AUTH_CONFIG = {

    isSignupEnabled: process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true",

    isEmailLoginEnabled: process.env.NEXT_PUBLIC_EMAIL_LOGIN_ENABLED === "true",

    isOAuthEnabled: process.env.NEXT_PUBLIC_OAUTH_ENABLED === "true",
  };

  export const AUTH_DISABLED_MESSAGES = {
    signup: "Sign up is currently disabled while the website is under construction. Please check back later.",
    login: "Login is currently disabled. Please contact the administrator for access.",
    oauth: "Social login is temporarily disabled. Please use email and password to log in."
  }; 