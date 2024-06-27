export const DBConfig = {
    name: "MyDB",
    version: 1,
    objectStoresMeta: [
        {
            store: "users",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: 'name', keypath: 'name', options: { unique: true } }
            ]
        },
        {
            store: "messages",
            storeConfig: { keyPath: "id", autoIncrement: true },
            storeSchema: [
                { name: 'senderId', keypath: 'senderId' },
                { name: 'senderName', keypath: 'senderName' },
                { name: 'message', keypath: 'message' },
                { name: 'timestamps', keypath: 'timestamps' }
            ]
        }
    ]
}