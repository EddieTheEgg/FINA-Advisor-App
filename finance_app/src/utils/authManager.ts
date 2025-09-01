// Simple auth manager for axios interceptor
let signOutCallback: (() => Promise<void>) | null = null;

export const authManager = {
  setSignOutCallback: (callback: () => Promise<void>) => {
    signOutCallback = callback;
  },

  signOut: async () => {
    if (signOutCallback) {
      await signOutCallback();
    }
  },

  clearSignOutCallback: () => {
    signOutCallback = null;
  },
};
