export const isBlackListed = function(blackOrWhite, domain) {
    if (!blackOrWhite || !domain) return false;
    return blackOrWhite.blacklist && blackOrWhite.blacklist.includes(domain);
}
  
export const isWhiteListed = function(blackOrWhite, domain) {
    if (!blackOrWhite || !domain) return false;
    return blackOrWhite.whiteList && blackOrWhite.whiteList.includes(domain);
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