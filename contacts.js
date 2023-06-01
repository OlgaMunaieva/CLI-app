const path = require("path");
const { readFile, writeFile } = require("fs/promises");
const { nanoid } = require("nanoid");
const { error } = require("console");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contactsJson = await readFile(contactsPath, "utf-8");
  return JSON.parse(contactsJson);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = await allContacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const newContacts = await allContacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
