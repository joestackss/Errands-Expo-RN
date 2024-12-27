export type AuthUser = {
  id: string;
  email: string;
  role: "requester" | "runner" | "both";
};

export type AuthResponse = {
  user: AuthUser | null;
  error: Error | null;
};
