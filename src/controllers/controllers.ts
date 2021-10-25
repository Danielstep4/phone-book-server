import Contact from "../models/contact";
import type express from "express";

const getAllContacts = async (_req: express.Request, res: express.Response) => {
  try {
    const contacts = await Contact.find({}).exec();
    if (contacts && contacts.length) {
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
      const allContacts = await Contact.find({ fullname });
      if (allContacts.length) return res.status(200).json(allContacts);
      return res.status(401).send("None");
    } catch (e) {
      console.error(e);
      return res.status(500).send("Server error! Please try again later.");
    }
  }
  return res.status(400).send("Bad request.");
};

const setNewContact = async (req: express.Request, res: express.Response) => {
  const { fullname, phone, description } = req.body as {
    fullname?: string;
    phone?: string;
    description?: string;
  };
  if (!fullname || !phone)
    return res
      .status(400)
      .send("Bed request! Please provide both fullname and phone number");

  const newContact = new Contact({
    fullname,
    phone,
    description,
  });
  try {
    await newContact.save();
    return res.status(201).send("New Contact " + fullname + " has been saved.");
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
