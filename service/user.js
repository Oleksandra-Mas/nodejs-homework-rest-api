const { User } = require('./schemas/users');
const bcrypt = require('bcryptjs');

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findByVerificationToken = async (verificationToken) => {
  return User.findOne({ verificationToken });
};

const getUserByEmailAndPassword = async ({ email, password }) => {
  const user = await getUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }
  return user;
};

const registerUser = async (data) => {
  const { password } = data;
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await User.create({ ...data, password: hashPassword });
  return user;
};

const updateToken = async (data) => {
  const { user, token } = data;
  const res = User.findByIdAndUpdate(
    { _id: user.id },
    { token },
    { new: true }
  ).select({ password: 0 });
  return res;
};

const changeAvatar = async (data) => {
  const { user, avatarUrl } = data;
  await User.findByIdAndUpdate(
    { _id: user.id },
    { avatarURL: avatarUrl },
    { new: true }
  );
};

const updateVerificationToken = async (_id) => {
  const res = User.findByIdAndUpdate(
    { _id },
    { verificationToken: null, verify: true },
    { new: true }
  );
  return res;
};

module.exports = {
  getUserByEmail,
  registerUser,
  getUserByEmailAndPassword,
  updateToken,
  changeAvatar,
  findByVerificationToken,
  updateVerificationToken,
};
