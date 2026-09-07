export function useAuth() {
  return {
    loading: false,
    user: { id: 'fictional-host' },
    profile: { id: 'fictional-host', role: 'host', full_name: 'Fictional Host' },
    signOut: () => {},
    showLoginDialog: () => {},
  };
}
