import Schema from 'jsonapi-helper';

const userSchema = new Schema({
  type: 'users',
  attributes: {
    email: 'email',
  },
});

export default userSchema;
