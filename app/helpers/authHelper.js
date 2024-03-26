import bcrypt from "bcryptjs";

const authHelper = async (password) => {
  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(hash);
        });
      });
    })
    return hashedPassword;
  } catch (err) {
    throw new Error(`Error hashing password: ${err.message}`);
  }
};

export default authHelper;
