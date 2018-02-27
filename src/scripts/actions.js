export const allowDomain = function(blackOrWhite, id, domain) {
    if (!blackOrWhite || !domain) return;
    // Add domain to whitelist
    let list = blackOrWhite['whitelist'] || [];
    list.push(domain);
    blackOrWhite['whitelist'] = [...list];
    localStorage.setItem(id, JSON.stringify(blackOrWhite));
    // TBD: Add stats to DB
}

export const blockDomain = function(blackOrWhite, id, domain, add) {
    // Add domain to blacklist if not in list already
    if (add && blackOrWhite) {
       // Add domain to blackList
        let list = blackOrWhite['blacklist'] || [];
        list.push(domain);
        blackOrWhite['whitelist'] = [...list];
    }
    // Prevent access to domain
    document.write('<h2>This website supports the NRA and has been blocked. #boycottNRA.</h2>');
    // TBD: Add button to unblock
}

const boycottDialog = function() {
    // TBD : Add stats on gun violence
    return '<dialog id="boycottDialog">\
        <form method="dialog">\
            <p>This website supports the NRA. #boycottNRA.</p>\
            <menu>\
                <button id="block" type="submit">Block</button>\
                <button id="proceed" type="reset">Ask Me Later</button>\
                <button id="allow" type="reset">Allow</button>\
            </menu>\
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