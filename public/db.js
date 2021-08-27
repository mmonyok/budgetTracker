let db;
let budgetVersion;

// Creates a new db request for our "budgetTracker" DB.
const request = indexedDB.open("budgetTracker", budgetVersion || 1);

// This handles database versioning. 
request.onupgradeneeded = (e) => {
  console.log("Upgrading IndexDB");

  const { oldDbVersion } = e;
  const newDbVersion = e.newDbVersion || db.version;

  console.log(`Database now updated from version ${oldDbVersion} to version ${newDbVersion}.`)

  db = e.target.result;

  // Creates a new object Store, if one does not already exist.
  if (db.objectStoreNames.length === 0) {
    db.createObjectStore("budgetStore", { autoIncrement: true });
  }
};

// Logs out an error, if one happens.
request.onerror = (e) => {
  console.log(`Error: ${e.target.errorCode}`);
}

function checkDatabase() {

};

// After each transaction, checks if it is online before running the checkDatabase function.
request.onsuccess = (e) => {
  console.log("Success!");
  db = e.target.result;

  if (navigator.onLine) {
    console.log("Connected to the interwebs again!");
    checkDatabase();
  }

};

// This function will save records to the indexedDB.
const saveRecord = (record) => {
  console.log('Current record saved.');

  // Gives readwrite access to the created transaction for the DB.
  const transaction = db.transaction(["budgetStore"], "readwrite");

  // Gives access from the transaction to the object store.
  const store = transaction.objectStore("budgetStore");

  // Here we add a record to our store.
  store.add(record);
};

// This event listener checks for when the app comes back online then runs the checkDatabase function.
window.addEventListener("online", checkDatabase);