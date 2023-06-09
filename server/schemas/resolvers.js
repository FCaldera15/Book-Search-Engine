const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      if (context.user) {
        const saveBooks = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: { ...args } } },
          { new: true, runValidators: true }
        );
        if (!context.user) {
          throw new AuthenticationError('You need to be logged in!');
        }
        return saveBooks;
      }
    },

    removeBook: async (parent, args, context) => {
      if (context.user) {
        const deleteBooks = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { ...args } } },
          { new: true }
        );
        if (!context.user) {
          throw new AuthenticationError('You need to be logged in!');
        }
        return deleteBooks;
      }
    },
  }
}

module.exports = resolvers;
