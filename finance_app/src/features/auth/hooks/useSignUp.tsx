import { useMutation } from '@tanstack/react-query';
import { signupUser } from '../api/api';
import { CreateAccountRequest } from '../types';
import { useSignupStore, useAccountInfoStore } from '../store/useSignupStore';
import { useAuth } from './useAuth';

export const useSignUp = () => {
  const { signInTokens } = useAuth();

  // Get data from Zustand stores
  const {
    firstName,
    lastName,
    email,
    password,
  } = useSignupStore();

  const {
    accountName,
    accountType,
    accountBalance,
    accountBank,
    creditLimit,
    accountNumber,
    routingNumber,
  } = useAccountInfoStore();

  //Convert the data from the Zustand stores to the CreateAccountRequest type
  const signUpData: CreateAccountRequest = {
    user_information: {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim().toLowerCase(),
      username: null, //Username for now is null, may implement option to require it later if needed
      password: password,
    },
    account_information: {
      account_name: accountName.trim(),
      account_type: accountType,
      balance: accountBalance,
      credit_limit: creditLimit,
      bank_name: accountBank,
      account_number: accountNumber,
      routing_number: routingNumber,
    },
  };

//Signup user and sign in the user automatically after successful signup (since the data is already setup in backend)
const {mutate, isPending, error, isSuccess} = useMutation({
    mutationFn: () => signupUser(signUpData),
    onSuccess: (tokens) => {
      //Sign in user with the token returned from the backend after successful signup
      //Set isFirstTime to true since this is a new signup
      signInTokens(tokens.accessToken, tokens.refreshToken, true);
    },
    onError: (errorBackend: any) => {
      console.error('Signup error:', errorBackend);
    },
  });

  return { isPending, error, isSuccess, mutate };
};
