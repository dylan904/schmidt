const hostId = '22222222-2222-4222-8222-222222222222';
const user = { id: hostId };
const profile = { id: hostId, role: 'host' };

export function useAuth() {
  return {
    user,
    profile,
    loading: false,
    showLoginDialog() {},
    async signOut() {},
    async refreshProfile() {
      return null;
    },
  };
}
