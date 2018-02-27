const nraList = require('../data/nra.json');
import guid from './utils/browserfingerprint.js';
import {
  isBlackListed,
  isWhiteListed,
  isWithdrawnNRA,
  isSupportsNRA
} from './checks.js';
import {
  blockDomain,
  allowDomain,
  informUser
} from './actions.js';

const getBlackWhiteList = function(id) {
  return JSON.parse(localStorage.getItem(id)) || null; 
}

const checkDomain = function() {
  // Get domain page to be loaded
  const hostname = window.location.hostname.split('.');
  const domain = hostname[1]+'.'+hostname[2];
  
  // Get browser fingerprint
  const id = guid();

  // Get list of blacklisted and whitelisted domains for this id
  // Stored in local storage 
  // TBD : also store in firebase
  const blackOrWhite = getBlackWhiteList(id);
  
  if(isBlackListed(blackOrWhite, domain)) {
    // Domain is blocked by this browser
    if (isWithdrawnNRA(nraList, domain)) {
      // Domain has withdrawn access from NRA, allow access
      allowDomain(blackOrWhite || {}, id, domain);
    } else {
      // Still supporting NRA, Prevent access
      blockDomain(blackOrWhite || {}, id, domain, false);
    }
  } else if (isSupportsNRA(nraList, domain) && !isWhiteListed(blackOrWhite, domain)) {
    // Domain is supported by NRA and user has not whitelisted it
    // Check if user wants to block
    informUser(blackOrWhite || {}, id, domain);
  }
}

document.addEventListener('DOMContentLoaded', checkDomain);