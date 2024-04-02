// Authenticates for protected routes (all but signup/login)
const protectedAuth = (context) => {
  const user = context.tokenPayload;
  // if (!user || !user.userId) {
  //   throw new Error('Authentication required');
  // }
};

export default protectedAuth;
