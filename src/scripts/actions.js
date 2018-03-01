import { writeToDB, readFromDB } from './utils/db.js';

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
    writeToDB(id, blackOrWhite);
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
        writeToDB(id, blackOrWhite);
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
    // localStorage.setItem(id, JSON.stringify(blackOrWhite));
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
    // localStorage.setItem(id, JSON.stringify(blackOrWhite));
    writeToDB(id, blackOrWhite);
}

const boycottDialog = function() {
    // TBD : Add stats on gun violence
    return '<dialog id="boycottDialog" class="dialog">\
        <form method="dialog">\
            <p>This website supports the NRA. #boycottNRA.</p>\
            <div class="dialog-actions">\
                <button id="block" class="dialog-button" type="submit">Block</button>\
                <button id="allow" class="dialog-button" type="reset">Allow</button>\
                <button id="proceed" class="dialog-button dialog-button__lg" type="reset">Ask Me Later</button>\
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