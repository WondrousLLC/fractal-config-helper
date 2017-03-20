'use strict';

const faker = require('faker');
const _ = require('lodash');
const fs = require('fs');
const Path = require('path');
const yaml = require('yamljs');
const customHelpterPath = 'fractal-config/custom-helpers';
const samplesFolder = 'samples';

const customHelperMethods = loadCustomConfigHelper();

function loadCustomConfigHelper() {
  try {
    // Default Path
    return require(Path.resolve(process.env.PWD, customHelpterPath));

  } catch (e) {
    // Default
    return {};
  }
}

let FractalConfigHelper = {
  loadYml(file) {
    let data = {};

    try {
      data = fs.readFileSync(file.replace('.js', '.yml'), 'utf8');
    } catch (e) {
      console.log('Error loading current yml config:', e.stack);
    }

    return yaml.parse(data);
  },
  sampleLoader(fileName) {
    let data = '';
    let customFilePath = Path.join(
      process.env.PWD,
      customHelpterPath,
      samplesFolder,
      fileName
    );
    let defaultFilePath = Path.join(
      __dirname,
      samplesFolder,
      fileName
    );

    try {
      data = fs.readFileSync(customFilePath, 'utf8');
    } catch (e) {
      try {
        data = fs.readFileSync(defaultFilePath, 'utf8');
      } catch (e) {
        console.log('Error loading sample:', e.stack);
      }
    }

    return data;
  }
};

FractalConfigHelper = _.defaults(FractalConfigHelper, customHelperMethods);

module.exports = FractalConfigHelper;
