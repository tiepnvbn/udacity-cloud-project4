import { TodosAccess } from '../helpers/todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// TODO: Implement businessLogic

const logger = createLogger('businessLogic_todos')

const todosAccess = new TodosAccess()

export async function createTodo(userId: string, newTodo: CreateTodoRequest): Promise<TodoItem> {
    const todoId = uuid.v4()
    let addnewItem: TodoItem = {
        userId,
        todoId,
        createdAt: new Date().toISOString(),
        done: false,
        ...newTodo,
        attachmentUrl: ''
    }
    logger.info('event log todos.createTodo[model to add new item]: ' + addnewItem);
    return await todosAccess.createTodo(addnewItem)
}

export async function getTodosByUserId(userId: string): Promise<TodoItem[]> {
    logger.info('event log todos.getTodosByUserId[userId]: ' + userId);
    return todosAccess.getTodosByUserId(userId)
}

export async function updateTodo(userId: string, todoId: string, updatedTodo: UpdateTodoRequest): Promise<TodoUpdate> {
    let todoUpdate: TodoUpdate = {
        ...updatedTodo
    }
    logger.info('event log todos.updateTodo[userId, todoId, todoUpdate]: ' + userId + "," + todoId + "," + todoUpdate);
    return todosAccess.updateTodo(userId, todoId, todoUpdate)
}

export async function updateAttachmentUrl(userId: string, todoId: string, attachmentUrl: string): Promise<string> {
    logger.info('event log todos.updateTodo[userId, todoId, attachmentUrl]: ' + userId + "," + todoId + "," + attachmentUrl);
    return todosAccess.updateAttachmentUrl(userId, todoId, attachmentUrl)
}

export async function deleteTodo(userId: string, todoId: string) {
    logger.info('event log todos.createTodo[userId, todoId]: ' + userId + "," + todoId);
    return todosAccess.deleteTodo(userId, todoId)

}


