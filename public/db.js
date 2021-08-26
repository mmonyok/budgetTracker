let db;

// Here we create a new db request for our "budgetTracker" database.
const request = indexedDB.open("budgetTracker", 1);