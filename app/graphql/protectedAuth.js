// Authenticates for protected routes (all but signup/login)
const protectedAuth = (context) => {
  const token = context.tokenPayload;
  if (!token || !token.userId) {
    throw new Error('Authentication required');
  }
  return token.userId;
};

export default protectedAuth;
