const { User } = require('./schemas/users');
const bcrypt = require('bcryptjs');

const getUserByEmail = async (email) => {
    return User.findOne({ email });
}

const getUserByEmailAndPassword = async ({ email, password }) => {
    const user = await getUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return null;
    }
    return user;
}

const registerUser = async (data) => {
    const { password } = data;
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = User.create({...data, password:hashPassword});
    return user;
}

const updateToken = async (data) => {
    const { user, token } = data;
    const res = User.findByIdAndUpdate({ _id: user.id }, {...User.user, token}, { new: true }).select({ "password": 0 });
    return res;
}

module.exports = {
    getUserByEmail,
    registerUser,
    getUserByEmailAndPassword,
    updateToken
}