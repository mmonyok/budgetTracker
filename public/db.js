let db;

// Here we create a new db request for our "budgetTracker" database.
const request = indexedDB.open("budgetTracker", 1);

request.onupgradeneeded = (e) => {
  console.log("Upgrading IndexDB");

  const { oldDbVersion } = e;
  const newDbVersion = e.newDbVersion || db.version;

  console.log(`Database now updated from version ${oldDbVersion} to version ${newDbVersion}.`)

  db = e.target.result;

  // what does autoIncrement possibly do here?
  if (db.objectStoreNames.length === 0) {
    db.createObjectStore("budgetStore", { autoIncrement: true });
  }
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