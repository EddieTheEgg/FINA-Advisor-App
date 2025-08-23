export type Token = {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
}

export type EmailAvailabilityResponse = {
    available: boolean;
    message: string;
}
