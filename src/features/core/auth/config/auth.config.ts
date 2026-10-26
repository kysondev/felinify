import { IS_BETA_MODE } from "@common/config/app.config";

export const AUTH_CONFIG = {

  isSignupEnabled: !IS_BETA_MODE,

  isEmailLoginEnabled: true,

  isOAuthEnabled: !IS_BETA_MODE,
};

export const AUTH_DISABLED_MESSAGES = {
  signup:
    "Sign up is currently disabled while the website is under closed beta. Please check back later.",
  login:
    "Login is currently disabled. Please contact the administrator for access.",
  oauth:
    "Social login is temporarily disabled. Please use email and password to log in.",
};
