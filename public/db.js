let db;

// Here we create a new db request for our "budgetTracker" database.
const request = indexedDB.open("budgetTracker", 1);

request.onupgradeneeded = (e) => {

};

request.onerror = (e) => {

}

function checkDatabase() {

};

request.onsuccess = (e) => {

};

const saveRecord = (record) => {

};

// This event checks if the app comes back online.
window.addEventListener("online", checkDatabase);