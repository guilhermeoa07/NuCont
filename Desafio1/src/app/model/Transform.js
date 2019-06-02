const mongoose = require('mongoose');

const TransformSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	classifier: {
		type: String
	},
	openingBalance: {
		type: Number
	},
	debit: {
		type: Number
	},
	credit: {
		type: Number
	},
	finalBalance: {
		type: Number
	},
	parent: {
		type: String,
		default: null
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});

const Transform = mongoose.model('Transform', TransformSchema);

module.exports = Transform;
