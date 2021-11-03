import { Request, Response } from 'express';
import { todoService } from './todo.service';

async function getTodos(req: Request, res: Response) {
  try {
    const todos = await todoService.query();
    res.send(todos);
  } catch (err) {
    console.error('Error in get todos', err);
    res.status(500).send({ err: 'Failed to get todos' });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const todoId = req.params.id;
    const todo = await todoService.getById(todoId);
    res.send(todo);
  } catch (err) {
    console.error('Error in get todo by id', err);
    res.status(500).send({ err: 'Failed to get todo' });
  }
}

async function deleteTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await todoService.remove(id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    console.error('Error in delete todo', err);
    res.status(500).send({ err: 'Failed to delete todo' });
  }
}

async function addTodo(req: Request, res: Response) {
  try {
    const todo = await todoService.add(req.body);
    res.send(todo);
  } catch (err) {
    console.error('Error in add todo', err);
    res.status(500).send({ err: 'Failed to add todo' });
  }
}

async function updateTodo(req: Request, res: Response) {
  try {
    const todo = req.body;
    const { id } = req.params;
    const updatedTodo = await todoService.update(todo, id);
    res.json(updatedTodo);
  } catch (err) {
    console.error('Error in update todo', err);
    res.status(500).send({ err: 'Failed to update todo' });
  }
}

export { getTodos, deleteTodo, addTodo, updateTodo, getById };
