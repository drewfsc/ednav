import { MongoClient } from 'mongodb';
import '../../../../../envConfig'

export async function POST(req) {

        const {  name, goal, actions } = await req.json();
        if (!name || !goal || !Array.isArray(actions) || actions.length === 0) {
            return Response.json({ message: 'Name, goal, and at least one action are required.' });
        }

        const client = new MongoClient(process.env.MONGODB_URI);

        try {
            await client.connect();
            const database = client.db('ActivityLog_DEV');
            const actionsCollection = database.collection('actions');

            const result = await actionsCollection.insertOne({ name, goal, actions });

            return Response.json({ message: 'Data saved successfully.', id: result.insertedId });
        } catch (error) {
            console.error(error);
           return  Response.json({ message: 'Internal server error.' });
        } finally {
            await client.close();
        }

}
