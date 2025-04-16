import { NextResponse } from 'next/server';
import { getCollection } from '/lib/mongodb';

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export async function GET() {
  try {
    const collection = await getCollection('navigators');
    const navigators = await collection.find({}).toArray();
    return NextResponse.json(navigators, { status: HTTP_STATUS.OK });
  } catch (error) {
    console.error('Error fetching navigators:', error);
    return NextResponse.json({ error: 'Failed to fetch navigators' }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
  }
} 