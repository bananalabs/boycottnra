import { writeToDB, readFromDB } from './utils/db.js';

export function incrementBlockedStats(domain) {
    const key = domain.replace(".", "%");
    readFromDB(key)
    .then((snapshot) => {
        const stats = snapshot.val() || {};
        stats['blocked'] = stats['blocked'] ? stats['blocked']++ : 1;
        writeToDB(key, stats);
    })
    .catch((err) => console.log(err));
}

export function incrementAllowedStats(domain) {
    const key = domain.replace(".", "%");
    readFromDB(key)
    .then((snapshot) => {
        const stats = snapshot.val() || {};
        stats['allowed'] = stats['allowed'] ? stats['allowed']++ : 1;
        writeToDB(key, stats);
    })
    .catch((err) => console.log(err));
}