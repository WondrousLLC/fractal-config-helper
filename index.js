const faker = require('faker');
const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');

const richText = {
  folder: 'samples',
  prefix: '_rich-text',
  types: {
    default: 'default',
    mid: 'mid',
    long: 'long',
  },
  seperator: '--',
  extension: '.html'
};

// todo
// export to separate module
// test for existing types
function sampleLoader(type = 'default') {
  let data = {};
  let filePath = path.join(
    __dirname,
    richText.folder,
    richText.prefix + richText.seperator + type + richText.extension
  );

  try {
    data = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.log('Error loading sample:', e.stack);
  }

  return () => data;
}

function loadCurrentConfig(file) {
  let data = {};

  try {
    data = fs.readFileSync(file.replace('.js', '.yml'), 'utf8');
  } catch (e) {
    console.log('Error loading current yml config:', e.stack);
  }

  return yaml.parse(data);
}

// ----------------------------------------------------------------
// Menu
// ----------------------------------------------------------------
function generateLanguageObject() {
  return initMenuObject(faker.address.countryCode());
}

function generateMenuObject(subMenu) {
  return initMenuObject(faker.random.word(), subMenu);
}

function initMenuObject(label, subMenu = []) {
  return {
    label: label,
    target: faker.internet.url(),
    isActive: faker.random.boolean(),
    submenu: subMenu
  };
}

// ----------------------------------------------------------------
// Custom
// ----------------------------------------------------------------
function getContactGroupsArray(amount) {
  if (amount === 1) {
    return {
      'media_press': 'Media & Press'
    }
  }

  if (amount === 2) {
    return {
      'media_press': 'Media & Press',
      'customer_service': 'Customer Service'
    }
  }

  return {
    'media_press': 'Media & Press',
    'customer_service': 'Customer Service',
    'career': 'Career'
  };
}

function generateContactsObject() {
  let amountOfContactGroups = Math.floor((Math.random() * 3 ) + 1);
  let contactGroups = getContactGroupsArray(amountOfContactGroups);

  return {
    name: faker.name.findName(),
    image: 'https://nosrc.io/600x340/people4',
    functions: [
      faker.company.companyName(),
      faker.company.companyName()
    ],
    phone: [
      faker.phone.phoneNumber(),
      faker.phone.phoneNumber()
    ],
    email: [
      faker.internet.email(),
      faker.internet.email()
    ],
    contact_groups: contactGroups
  };
}

function generateDownloadsObject() {
  return {
    file_size: Math.floor((Math.random() * 10000) + 1),
    link: '#',
    date: '27 / 01 / 2015',
    link_label: faker.random.words(3)
  };
}

module.exports = {
  generateMenuObject: generateMenuObject,
  generateLanguageObject: generateLanguageObject,
  generateContactsObject: generateContactsObject,
  generateDownloadsObject: generateDownloadsObject,
  getContactGroupsArray: getContactGroupsArray,
  exampleWysiwyg: sampleLoader('default'),
  bigExampleWysiwyg: sampleLoader('long'),
  loadCurrentConfig: loadCurrentConfig
};