const express = require('express');
import { getTodos, addTodo, updateTodo, deleteTodo, getById } from './todo.controller';
const router = express.Router();

router.get('/', getTodos);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.get('/:id', getById);

module.exports = router;
