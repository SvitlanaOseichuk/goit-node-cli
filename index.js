import { program } from "commander";
import allContacts from "./contacts.js";


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await allContacts.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await allContacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const addContact = await allContacts.addContact({name, email, phone});
      console.log(addContact);
      break;

    case "remove":
      const removedContact = await allContacts.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);