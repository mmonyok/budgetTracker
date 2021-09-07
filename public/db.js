let db;
let budgetVersion;

// Creates a new db request for our "budgetTracker" DB.
const request = indexedDB.open("budgetTracker", budgetVersion || 33);

// This handles database versioning. 
request.onupgradeneeded = (e) => {
  console.log("Upgrading IndexDB");

  const { oldVersion } = e;
  const newDbVersion = e.newVersion || db.version;

  console.log(`Database now updated from version ${oldVersion} to version ${newDbVersion}.`)

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

// This function will be posting data or transactions to the database.
function checkDatabase() {
  console.log("Process of checking database begun.");

  // Here we open a transaction on our db and give it read/write priveleges.
  let transaction = db.transaction(["budgetStore"], "readwrite");

  // Here we are providing access to our db object.
  const store = transaction.objectStore("budgetStore");

  // Here we are creating a variable that encompasses all records from our store.
  const storeRecords = store.getAll();

  storeRecords.onsuccess = () => {
    // Here we are bulk adding items from the store to the database once we are online.
    if (storeRecords.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(storeRecords.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((respons) => respons.json())
        .then((res) => {
          if (res.length !== 0) {
            transaction = db.transaction(["budgetStore"], "readwrite");

            const currentStore = transaction.objectStore("budgetStore");

            currentStore.clear();
            console.log("The store is now wiped clean.");
          }
        });
    }
  };
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