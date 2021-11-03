// const { getCollection } = require('../../services/db.service');
import { Document } from 'bson';
import { getCollection } from '../../services/db.service';
const { ObjectId } = require('mongodb');

async function query() {
  const collection = await getCollection('todo');
  const todos = await collection.find({}).toArray();
  return todos;
}

async function getById(id: string) {}

async function remove(id: string) {
  const todos = await getCollection('todo');
  return await todos.deleteOne({ _id: ObjectId(id) });
}

async function add(todo: {}) {
  const todos = await getCollection('todo');
  return await todos.insertOne(todo);
}

async function update(todo: Document, id: string) {
  delete todo._id;
  const todos = await getCollection('todo');
  await todos.updateOne({ _id: ObjectId(id) }, { $set: todo });
  return todo;
}

export const todoService = { query, getById, remove, add, update };
