'use strict';

const htmlConverter = require('./html.converter');

const preset = {
  converters: {
    html: htmlConverter
  }
};

module.exports = preset;