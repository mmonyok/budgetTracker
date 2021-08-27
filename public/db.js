let db;

// Here we create a new db request for our "budgetTracker" database.
const request = indexedDB.open("budgetTracker", 1);

// This handles 
request.onupgradeneeded = (e) => {
  console.log("Upgrading IndexDB");

  const { oldDbVersion } = e;
  const newDbVersion = e.newDbVersion || db.version;

  console.log(`Database now updated from version ${oldDbVersion} to version ${newDbVersion}.`)

  db = e.target.result;

  // This creates a new object Store if one does not already exist.
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
  console.log("Success!");
  db = e.target.result;

  // After each transaction it will check if you are online before reading from the DB.
  if (navigator.onLine) {
    console.log("Connected to the interwebs again!");
    checkDatabase();
  }

};

const saveRecord = (record) => {
  console.log('Current record saved.');

  // Gives readwrite access to the created transaction for the DB.
  const transaction = db.transaction(["budgetStore"], "readwrite");

  // Gives access from the transaction to the object store.
  const store = transaction.objectStore("budgetStore");

  // Here we add a record to our store.
  store.add(record);
};

// This event checks if the app comes back online.
window.addEventListener("online", checkDatabase);