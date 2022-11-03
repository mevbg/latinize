// ===================================================|
// Config: MANIFEST

const {
  name,
  title,
  version,
  author,
  description
} = require('../package.json');

const icon = 'assets/icon.png';

module.exports = {
  // Required
  manifest_version: 3,
  name: title,
  version,

  // Recommended
  action: {
    default_icon: {
      16: icon,
      24: icon,
      32: icon
    },
    default_title: title,
    default_popup: 'index.html'
  },
  description,
  icons: {
    16: icon,
    32: icon,
    48: icon,
    128: icon
  },

  // Optional
  author: author.name,
  minimum_chrome_version: '100',
  permissions: ['clipboardRead', 'clipboardWrite'],
  short_name: name
};
