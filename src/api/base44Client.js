export const base44 = {
  app: {
    async getPublicSettings() {
      throw new Error("Firebase backend not configured yet. PUBLIC_SETTINGS_PENDING")
    },
  },
  auth: {
    async loginViaEmailPassword(email) {
      throw new Error("Firebase authentication is not configured yet.")
    },
    loginWithProvider(provider, returnTo = "/") {
      throw new Error(`Social login with ${provider} requires Firebase setup first.`)
    },
    async me() {
      const token = window?.localStorage?.getItem("auth_token")
      if (!token) {
        const error = new Error("No session token found.")
        error.status = 401
        throw error
      }
      return { email: null, id: null }
    },
    setToken(token) {
      if (!window || !window.localStorage) return
      window.localStorage.setItem("auth_token", token)
    },
    logout(returnTo) {
      if (window?.localStorage) {
        window.localStorage.removeItem("auth_token")
      }
      if (returnTo) {
        window.location.href = returnTo
      }
    },
    redirectToLogin(returnTo = "/login") {
      window.location.href = returnTo
    },
    async register() {
      throw new Error("Firebase user registration is not configured yet.")
    },
    async verifyOtp() {
      throw new Error("Firebase OTP verification is not configured yet.")
    },
    async resendOtp() {
      throw new Error("Firebase OTP resend is not configured yet.")
    },
    async resetPasswordRequest() {
      throw new Error("Password reset is not configured yet.")
    },
    async resetPassword() {
      throw new Error("Password reset is not configured yet.")
    },
  },
}