const isNode = typeof window === 'undefined'

const clearStoredAccessToken = () => {
  if (isNode) return
  window.localStorage.removeItem('auth_token')
  window.localStorage.removeItem('token')
}

const isClearAccessTokenRequested = () =>
  !isNode && new URLSearchParams(window.location.search).get('clear_access_token') === 'true'

const getStoredAccessToken = () => {
  if (isNode) return null
  return window.localStorage.getItem('auth_token')
}

const getAppParams = () => {
  if (isClearAccessTokenRequested()) {
    clearStoredAccessToken()
  }

  return {
    appId: undefined,
    token: getStoredAccessToken(),
    functionsVersion: import.meta.env.VITE_FIREBASE_FUNCTIONS_VERSION,
    appBaseUrl: import.meta.env.VITE_SITE_URL,
  }
}

export const appParams = {
  ...getAppParams(),
}