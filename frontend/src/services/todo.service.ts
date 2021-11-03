import { httpService } from './http.service';
export interface Todo {
  _id: string;
  info: string;
  importance: number;
}

export interface TodoMini {
  info: string;
  importance: number;
}

interface ImportanceObj {
  [num: number]: string;
}

export const ImportanceEnum: ImportanceObj = {
  1: 'Important',
  2: 'Undecided',
  3: 'Not Important',
};

// API:

async function query() {
  try {
    const response = await httpService.get('todo');
    return response;
  } catch (err) {
    console.error('Error in add:', err);
    throw err;
  }
}

async function add(todo: Todo) {
  try {
    const response = await httpService.post('todo', todo);
    return response.insertedId;
  } catch (err) {
    console.error('Error in add:', err);
    throw err;
  }
}

async function update(todo: Todo) {
  try {
    const response = await httpService.put(`todo/${todo._id}`, todo);
    return response;
  } catch (err) {
    console.error('Error in update:', err);
    throw err;
  }
}

async function remove(id: string) {
  try {
    const response = await httpService.delete(`todo/${id}`);
    return response;
  } catch (err) {
    console.error('Error in update:', err);
    throw err;
  }
}

export const todoService = { query, add, update, remove };
