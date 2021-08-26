let db;

// Here we create a new db request for our "budgetTracker" database.
const request = indexedDB.open("budgetTracker", 1);

request.onupgradeneeded = (e) => {
// possibly add updating to new version from old version.

db = e.target.result;

// what does autoIncrement possibly do here?
db.createObjectStore("budgetStore");
};

// This will log out an error, if one happens.
request.onerror = (e) => {
  console.log(`Error: ${e.target.errorCode}`);
}

function checkDatabase() {

};

request.onsuccess = (e) => {

};

const saveRecord = (record) => {

};

// This event checks if the app comes back online.
window.addEventListener("online", checkDatabase);