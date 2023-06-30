const database = 'book_store_mongo_db';

use(database);

db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [{
            role: "readWrite", db: "book_store_mongo_db"
        },
        {
            role: "dbOwner", db: "book_store_mongo_db"
        },]
    }
)