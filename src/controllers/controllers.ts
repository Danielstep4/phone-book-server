import ContactModel from "../models/contact";
import type { Contact } from "../models/contact";
import type express from "express";
import { verifyPhone } from "../utils/verifyPhone";

const getAllContacts = async (_req: express.Request, res: express.Response) => {
  try {
    // #TODO: Fix SOrt
    const contacts = await ContactModel.find({}).sort({ fullname: 1 }).exec();
    if (contacts) {
      return res.status(200).json(contacts);
    }
    return res.status(404).send("None");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server error! Please try again later.");
  }
};

const getContactByName = async (
  req: express.Request,
  res: express.Response
) => {
  if (req.params && req.params.fullname) {
    const { fullname } = req.params as { fullname: string };
    try {
      const allContacts = await ContactModel.find({
        fullname: fullname.trim().toLowerCase(),
      });
      if (allContacts) return res.status(200).json(allContacts);
      return res.status(404).send("None");
    } catch (e) {
      console.error(e);
      return res.status(500).send("Server error! Please try again later.");
    }
  }
  return res.status(400).send("Bad request.");
};

const setNewContact = async (req: express.Request, res: express.Response) => {
  const { fullname, phone, description } = req.body as Contact;
  if (
    !fullname.trim() ||
    !phone.trim() ||
    !verifyPhone(phone) ||
    fullname.length > 32
  )
    return res
      .status(400)
      .send(
        "Bed request! Please provide both fullname and phone number. (max: 32 characters)"
      );

  const newContact = new ContactModel({
    fullname: fullname.toLowerCase().trim(),
    phone: phone.trim(),
    description,
  });
  try {
    const contact = await newContact.save();
    return res.status(201).json(contact);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server error! Please try again later.");
  }
};
export default {
  getAllContacts,
  getContactByName,
  setNewContact,
};
