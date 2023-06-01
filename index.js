const contacts = require("./contacts.js");
const readline = require("readline");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);
      break;

    case "remove":
      await contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw" });
// invokeAction({
//   action: "add",
//   name: "Ola",
//   email: "mun@gmail.com",
//   phone: "123456789",
// });
invokeAction({ action: "remove", id: "AeHIrLTr6JkxGE6SN-0Rw" });

const rl = readline.createInterface({
  input: process.stdin, // введення зі стандартного потоку
  output: process.stdout, // виведення у стандартний потік
});

console.log(contacts.name);
// contacts.listContacts();
// addContact();

console.log("welcome to node.js");
