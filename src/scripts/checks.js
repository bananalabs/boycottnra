export const isBlackListed = function(blackOrWhite, domain) {
    if (!blackOrWhite || !domain) return false;
    return blackOrWhite.blacklist ? blackOrWhite.blacklist.includes(domain) : false;
}
  
export const isWhiteListed = function(blackOrWhite, domain) {
    if (!blackOrWhite || !domain) return false;
    return blackOrWhite.whitelist ? blackOrWhite.whitelist.includes(domain) : false;
}

export const isWithdrawnNRA = function(domains, domain) {
    return domains &&
           domains[domain] &&
           domains[domain] === 'withdrawnNRA';
}

export const isSupportsNRA = function(domains, domain) {
    return domains &&
           domains[domain] &&
           domains[domain] === 'supportsNRA';
}