import { writeToDB, readFromDB } from './utils/db.js';
import { incrementBlockedStats, incrementAllowedStats } from './stats.js';

export function getBlackWhiteList(id) {
    return readFromDB(id);
}

export const allowDomain = function(blackOrWhite, id, domain) {
    if (!blackOrWhite || !domain) return;
    // Add domain to whitelist
    let whitelist = blackOrWhite['whitelist'] || [];
    if (!whitelist.includes(domain)) {
        whitelist.push(domain);
        blackOrWhite['whitelist'] = [...whitelist];
    }
    // Remove domain from blacklist
    let blacklist = blackOrWhite['blacklist'] || [];
    const index = blacklist.indexOf(domain);
    if (index >= 0) {
        blacklist.splice(index, 1);
        blackOrWhite['blacklist'] = [...blacklist];
    }
    // Increment allowed count for this user + domain
    let allowed = blackOrWhite['allowed'] || {};
    const key = domain.replace(".", "%");
    allowed[key] = allowed[key] ? allowed[key] + 1 : 1;
    blackOrWhite['allowed'] = Object.assign({}, allowed);
    writeToDB(id, blackOrWhite);
    // Increment overall allowed count for all users, once per user per domain
    if (allowed[key] <= 1) {
        incrementAllowedStats(domain);
    }
}

export const blockDomain = function(blackOrWhite, id, domain, addToList, blockNow = true) {
    // Add domain to blacklist if not in list already
    if (addToList && blackOrWhite) {
       // Add domain to blackList
        let blacklist = blackOrWhite['blacklist'] || [];
        if (!blacklist.includes(domain)) {
            blacklist.push(domain);
            blackOrWhite['blacklist'] = [...blacklist];
        }
        // Remove domain from whitelist
        let whitelist = blackOrWhite['whitelist'] || [];
        const index = whitelist.indexOf(domain);
        if (index >= 0) {
            whitelist.splice(index, 1);
            blackOrWhite['whitelist'] = [...whitelist];
        }
        // Increment blocked count for this user + domain
        let blocked = blackOrWhite['blocked'] || {};
        const key = domain.replace(".", "%");
        blocked[key] = blocked[key] ? blocked[key] + 1 : 1;
        blackOrWhite['blocked'] = Object.assign({}, blocked);
        writeToDB(id, blackOrWhite);
        // Increment overall blocked count for all users, once per user per domain
        if (blocked[key] <= 1) {
            incrementBlockedStats(domain);
        }
    }
    // Prevent access to domain
    if (blockNow) {
        document.write('<h2>This website supports the NRA and has been blocked. #boycottNRA.</h2>');
    }
}

export function unblockDomain(blackOrWhite, id, domain) {
    // Remove domain from backlist
    if (!blackOrWhite || !domain) return;
    if (blackOrWhite['blacklist']) {
        const index = blackOrWhite['blacklist'].indexOf(domain);
        if (index >= 0) {
            blackOrWhite['blacklist'].splice(index, 1);
        }
    }
    writeToDB(id, blackOrWhite);
}

export function unallowDomain(blackOrWhite, id, domain) {
    // Remove domain from whitelist
    if (!blackOrWhite || !domain) return;
    if (blackOrWhite['whitelist']) {
        const index = blackOrWhite['whitelist'].indexOf(domain);
        if (index >= 0) {
            blackOrWhite['whitelist'].splice(index, 1);
        }
    }
    writeToDB(id, blackOrWhite);
}

const boycottDialog = function() {
    // TBD : Add stats on gun violence
    return '<dialog id="boycottDialog">\
        <form id="boycottForm" method="dialog">\
            <p id="boycottCaption">This website supports the NRA. #boycottNRA.</p>\
            <div id="dialogActions">\
                <button id="boycottBlock"style="margin-left: 10px">Block</button>\
                <button id="boycottAllow">Allow</button>\
                <button id="boycottProceed" style="width:150px;margin-right:0">Ask Me Later</button>\
            </div>\
        </form>\
    </dialog>\
    ';
}

export const informUser = function(blackOrWhite, id, domain) {
    const origHTML = document.body.innerHTML.slice();
    document.body.innerHTML = boycottDialog();
    const dialog = document.getElementById('boycottDialog');
    const block = document.getElementById('block');
    const proceed = document.getElementById('proceed');
    const allow = document.getElementById('allow');
    dialog.showModal();
    block.addEventListener('click', function() {
        blockDomain(blackOrWhite, id, domain, true);
        dialog.close();
    });
    proceed.addEventListener('click', function() {
        document.body.innerHTML = origHTML;
        dialog.close();
    });
    allow.addEventListener('click', function() {
        allowDomain(blackOrWhite, id, domain);
        document.body.innerHTML = origHTML;
        dialog.close();
    });
}