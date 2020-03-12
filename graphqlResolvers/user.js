const bcrypt = require('bcrypt');
const User = require('../models/user');
const tokenController = require('../controllers/verificationTokenController');
const timeZone = require('../utils/timeZoneUtil');
const userMiddleware = require('../middleware/userMiddleware');

module.exports = {
  async createUser(args) {
    userMiddleware.createUser(args);
    const { firstName, lastName, email, phone, isAdmin, password } = args;
    let user = await User.findOne({ email });
    if (user) throw new Error('User already registered.');

    user = new User({
      firstName,
      lastName,
      email,
      phone,
      isAdmin,
      password,
      createdDate: timeZone(),
      lastUpdatedDate: timeZone()
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    await tokenController.createToken(user)
    user.token = user.generateAuthToken();

    return user;
  },

  async editUser(args, context) {
    userMiddleware.editUser(args);
    const { firstName, lastName, phone, isAdmin } = args
    const user = await User.findByIdAndUpdate(context.user._id, {
      firstName,
      lastName,
      phone,
      isAdmin,
      lastUpdatedDate: timeZone()
    })

    if (!user) throw new Error('The user with the given Id does not exist');
    return user;
  },

  async changeUserActivationStatus(args) {
    userMiddleware.changeUserActivationStatus(args);
    const { enabled, userId } = args;
    const user = await User.findByIdAndUpdate(userId, {
      enabled,
      lastUpdatedDate: timeZone()
    })

    if (!user) throw new Error('The user with the given Id does not exist');

    return user;
  },

  async getAllUsers() {
    const users = await User.find().select('-password -__v')

    if (users.length < 1) throw new Error('No record found.');
    return users;
  },
  
}

