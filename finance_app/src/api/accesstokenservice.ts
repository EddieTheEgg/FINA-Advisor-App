// This class is used to store the access token in the local storage
// It is a singleton class, so only one instance of the class is created
// and it is used to store the access token in the local storage
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

    public setAccessToken(token: string | null) {
      this.accessToken = token;
    }

    public getAccessToken() {
      return this.accessToken;
    }
  }

  export const accessTokenService = AccessTokenService.getInstance();
