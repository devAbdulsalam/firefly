import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
// import validator from 'validator';
const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 2,
			max: 100,
		},
		email: {
			type: String,
			max: 50,
		},
		id: {
			type: String,
		},
		avatar: {
			type: String,
			default: 'https://avatar.com/picture.jpg',
		},
		password: {
			type: String,
			required: true,
			min: 5,
		},
		phone: {
			type: String,
			min: 9,
		},
		role: {
			type: String,
			enum: ['USER', 'PARTNER', 'ADMIN', 'SUPER_ADMIN'],
			default: 'USER',
		},
	},
	{ timestamps: true }
);

UserSchema.pre('save', function (next) {
	this.id = this._id;
	next();
});


const User = mongoose.model('User', UserSchema);
export default User;
