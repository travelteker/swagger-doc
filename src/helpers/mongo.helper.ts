import * as mongodb from 'mongodb';

export class MongoHelper {

    public static client: mongodb.MongoClient;

    public static connect(url: string) {
        return new Promise((resolve, reject) => {
            mongodb.MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
                if(err) {
                    reject(err);
                }else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            })
        });
    }
}