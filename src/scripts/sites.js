const sites = require('../data/nra.json');
import { addElement } from './utils/dom.js';
import { blockDomain, allowDomain, unblockDomain, unallowDomain, getBlackWhiteList } from './actions.js';
import guid from './utils/browserfingerprint.js';

const id = guid();

function blockSite(event, list) {
    console.log('blockSite');
    console.log(event);
    console.log(list);
    const domain = event.target.id.split('_')[1];
    if (event.target.checked) {
        blockDomain(list, id, domain, true, false);
        // Uncheck Allow checkbox and remove domain from whitelist
        const allowCheckbox = document.getElementById(`allow_`+domain);
        allowCheckbox.checked = false;
    } else {
        unblockDomain(list, id, domain);
    }
    
}

function allowSite(event, list) {
    const domain = event.target.id.split('_')[1];
    if (event.target.checked) {
        allowDomain(list, id, domain);
        // Uncheck Block checkbox and remove domain from blacklist
        const blockCheckbox = document.getElementById(`block_`+domain);
        blockCheckbox.checked = false;
    } else {
        unallowDomain(list, id, domain);
    }
}

(function createSitesTable() {
    getBlackWhiteList()
    .then((snapshot) => {
        let list = snapshot.child(id).val() || {};
        const blacklist = list['blacklist'] || [];
        const whitelist = list['whitelist'] || [];
        const table = document.getElementById('sites_table');
        // Create a row for each site that supports NRA
        Object.keys(sites).forEach((siteName) => {
            if (sites[siteName] === 'supportsNRA') {
                let row = addElement(
                    "tr",
                    {
                        id: `row_+${siteName}`
                    },
                    table
                );
                let colName = addElement(
                    "td",
                    {
                        innerHTML: siteName
                    },
                    row
                );
                let colBlock = addElement(
                    "td",
                    {},
                    row
                );
                let colBlockContent = addElement(
                    "input",
                    {
                        type: "checkbox",
                        name: `block_${siteName}`,
                        id: `block_${siteName}`,
                        checked: blacklist.includes(siteName)
                    },
                    colBlock
                );
                colBlockContent.addEventListener("change", (event) => blockSite(event, list));
                let colAllow = addElement(
                    "td",
                    {},
                    row
                );
                let colAllowContent = addElement(
                    "input",
                    {
                        type: "checkbox",
                        name: `allow_${siteName}`,
                        id: `allow_${siteName}`,
                        checked: whitelist.includes(siteName)
                    },
                    colAllow
                );
                colAllowContent.addEventListener("change", (event) => allowSite(event, list));
            }
        })
    })
    .catch((err) => console.log(err));
})();