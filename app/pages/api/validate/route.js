import { MongoClient } from 'mongodb';
import '../../../../envConfig'

export async function POST(req) {

        const { email, pin } = await req.json();
        if (!email || !pin || pin.length !== 4) {
            return Response.json({ message: 'Email and a 4-digit PIN are required.' });
        }

        const client = new MongoClient(process.env.MONGODB_URI);

        try {
            await client.connect();
            const database = client.db('ActivityLog_DEV');
            const usersCollection = database.collection('users');

            const user = await usersCollection.findOne({email, pin} );
            console.log(user);

            if (user) {
                return Response.json(user);
            } else {
              return  Response.json({ message: 'Invalid email or PIN.' });
            }
        } catch (error) {
            console.error(error);
           return  Response.json({ message: 'Internal server error.' });
        } finally {
            await client.close();
        }

}
