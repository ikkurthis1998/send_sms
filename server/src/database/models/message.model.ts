import { Schema, model, Types } from "mongoose";
import { EMessageStatus } from "../../store/enum/messageStatus.enum";

const messageSchema = new Schema(
	{
		otp: {
			type: String,
			required: true,
			trim: true,
		},
		message: {
			type: String,
			required: true,
			trim: true,
		},
		contact: {
			type: Types.ObjectId,
			required: true,
			ref: "Contact",
		},
		status: {
			type: String,
			required: true,
			enum: EMessageStatus,
			default: EMessageStatus.FAILED,
		},
	},
	{
		timestamps: true,
	}
);

export const Message = model("Message", messageSchema, "Message");
