import { Schema, model } from "mongoose";

const contactSchema = new Schema(
	{
		id: {
			type: Number,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Contact = model("Contact", contactSchema, "Contact");
