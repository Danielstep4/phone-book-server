import mongoose, { Document, Model } from "mongoose";

const ContactSchema = new mongoose.Schema<ContactDocument, ContactModel>({
  phone: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  description: String,
});

export default mongoose.connections[0].readyState
  ? mongoose.model<ContactDocument, ContactModel>("Contact")
  : mongoose.model<ContactDocument, ContactModel>("Contact", ContactSchema);

type Contact = { phone: string; fullname: string; description?: string };

interface ContactDocument extends Contact, Document {}

interface ContactModel extends Model<ContactDocument> {}
