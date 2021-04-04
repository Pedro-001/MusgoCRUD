const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')("app:mongo")
const { config } =  require('../config/index');

const USER=  encodeURIComponent(config.dbUser);
const PASSWORD= encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

class Mongolib {
    constructor() {
        debug('MONGO_URI', MONGO_URI)
        this.client= new MongoClient(MONGO_URI, {useNewUrlParser: true});
        this.dbName = DB_NAME;
    }

    async connect(){
        if (!Mongolib.connection){
            try {
                await this.client.connect();
                debug('Connected succesfully to mongo');
                Mongolib.connection = this.client.db(this.dbName);
            } catch (error) {
                debug(error)
            }
        }
        return Mongolib.connection;
    }

    async getAll(collection, query){
        try {
            const db = await this.connect()
            return await db.collection(collection).find(query).toArray();
        } catch (error) {
            debug(error)
        }
    }

    async get(collection,id){
        try {
            const db = await this.connect();
            return await db.collection(collection).findOne({ _id: ObjectId(id) });
        } catch (error) {
            debug(error)
        }
    }

    async create(collection, data){
        try {
           const db = await this.connect()
           const result =  await db.collection(collection).insertOne(data);
           return result.insertId;
        } catch (error) {
            debug(error)
        }
    }

    async update(collection, id, data){
        try {
            const db =  await this.connect()
            const result =  await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
            return result.upsertId || id;
        } catch (error) {
            
        }
    }
    
    async delete(collection, id){
        try {
            const db = await this.connect()
            const result = await db.collection(collection).deleteOne({ _id: ObjectId(id) });
            return result;
        } catch (error) {
            debug(error)
        }
    }
  
}

module.exports = Mongolib;


