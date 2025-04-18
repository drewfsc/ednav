import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET all notes
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const clientId = url.searchParams.get('clientId') || '';
  const activityId = url.searchParams.get('activityId') || '';

  let notes: any[] = [];
  try {
    const collection = await getCollection('notes');

    // Filter by clientId if provided
    if (clientId && !activityId) {
      notes = await collection
        .find({ clientId: new ObjectId(clientId) })
        .sort({ createdAt: -1 })
        .toArray();
    }
    // Filter by activityId if provided
    else if (activityId) {
      notes = await collection
        .find({ activityId })
        .sort({ createdAt: -1 })
        .toArray();
    }
    // No filters, return all notes
    else {
      notes = await collection
        .find()
        .sort({ createdAt: -1 })
        .toArray();
    }

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

// POST to add a new note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { note } = body;

    if (!note) {
      return NextResponse.json({ error: 'Note data is required' }, { status: 400 });
    }

    const collection = await getCollection('notes');

    // Prepare the note object for database insertion
    const noteToInsert = {
      ...note,
      createdAt: note.createdAt || new Date().toISOString(),
      // Convert clientId to ObjectId if it's a string
      clientId: typeof note.clientId === 'string' ? new ObjectId(note.clientId) : note.clientId
    };

    const result = await collection.insertOne(noteToInsert);

    return NextResponse.json({
      message: 'Note added successfully',
      _id: result.insertedId
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding note:', error);
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}
