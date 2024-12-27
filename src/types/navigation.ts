export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  CreateProfile: { userId: string };
  VerifyEmail: { email: string };
};

export type MainTabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
};
