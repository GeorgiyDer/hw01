const fs = require('fs/promises');
const path = require('path');
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");


const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

  
const getContactById = async(contactId) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const result = contacts.find((item) => item.id == contactId);
    if(!result){
        return null;
    }
    return result;
}
  

const removeContact = async(contactId) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data); 
    const idx = contacts.findIndex((item) => item.id == contactId);
    if (idx === -1) {
        return null;
    }
    const delContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(delContacts));
    return contacts[idx];
}
  
const addContact = async(name, email, phone) => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContacts = {...name, ...email, ...phone, id: v4()}
    contacts.push(newContacts)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContacts;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}