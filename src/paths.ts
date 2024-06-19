const paths = {
  home() {
    return '/'
  },
  about() {
    return '/about'
  },
  login() {
    return '/login'
  },
  signUp() {
    return '/signup'
  },
  contact() {
    return '/contact'
  },
}

export default paths
export const authRoutes = ['/login', '/signup']
export const publicRoutes = ['/', '/design-system']
export const apiAuthPrefix = '/api/auth'
export const DEFAULT_LOGIN_REDIRECT = '/settings'
