const authenticate = (context) => {
  const { user } = context;
  if (!user) {
    throw new Error('Authentication required');
  }
};

export default authenticate;
