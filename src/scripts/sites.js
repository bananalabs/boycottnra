const sites = require('../data/nra.json');
import { addElement } from './utils/dom.js';
import { blockDomain, allowDomain, unblockDomain, unallowDomain, getBlackWhiteList } from './actions.js';
import guid from './utils/browserfingerprint.js';

const id = guid();

function blockSite(event) {
    const domain = event.target.id.split('_')[1];
    getBlackWhiteList()
    .then((snapshot) => {
        let list = snapshot.child(id).val() || {};
        console.log('list in blockSite');
        console.log(list);
        event.target.checked ?
        blockDomain(list, id, domain, true, false) :
        unblockDomain(list, id, domain);
    })
    .catch((err) => console.log(err));
}

function allowSite(event) {
    const domain = event.target.id.split('_')[1];
    getBlackWhiteList()
    .then((snapshot) => {
        let list = snapshot.child(id).val() || {};
        event.target.checked ?
        allowDomain(list, id, domain) :
        unallowDomain(list, id, domain);
    });
}

(function createSitesTable() {
    console.log('createSitesTable');
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
                    id: `block_${siteName}`
                },
                colBlock
            );
            colBlockContent.addEventListener("change", blockSite);
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
                    id: `allow_${siteName}`
                },
                colAllow
            );
            colAllowContent.addEventListener("change", allowSite);
        }
    })
})();