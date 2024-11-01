import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	id: { type: String },
	description: { type: String, required: true },
	address: { type: String, required: true },
	status: {
		type: String,
		enum: ['PENDING', 'CANCELLED', 'COMPLETED'],
		default: 'PENDING',
	},
	timestamp: { type: Date, default: Date.now },
});


reportSchema.pre('save', function (next) {
	this.id = this._id;
	next();
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
