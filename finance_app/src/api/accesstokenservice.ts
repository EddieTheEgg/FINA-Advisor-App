class AccessTokenService {
    private static instance: AccessTokenService;
    private accessToken: string | null = null;

    private constructor() {}

    // Singleton pattern to ensure only one instance of the service is created
    public static getInstance(): AccessTokenService {
      if (!AccessTokenService.instance) {
        AccessTokenService.instance = new AccessTokenService();
      }
      return AccessTokenService.instance;
    }

    public setToken(token: string | null) {
      this.accessToken = token;
    }

    public getToken() {
      return this.accessToken;
    }
  }

  export const accessTokenService = AccessTokenService.getInstance();
