import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TodoList } from './TodoList'

describe('TodoList', () => {
  it('should render TodoList with title "todos"', () => {
    render(<TodoList />)

    const titleElement = screen.getByText('todos', { selector: 'h1' })
    expect(titleElement).toBeTruthy()
  })

  it('should render input field for adding tasks', () => {
    render(<TodoList />)

    const inputField = screen.getByLabelText('What needs to be done?')
    expect(inputField).toBeTruthy()

    const buttonAdd = screen.getByTestId('button-add')
    expect(buttonAdd).toBeTruthy()
  })

  it('should render task list', () => {
    render(<TodoList />)

    const taskList = screen.getByRole('list')
    expect(taskList).toBeTruthy()
  })

  it('should add a task on pressing Enter key', () => {
    render(<TodoList />)

    const inputField = screen.getByLabelText('What needs to be done?')

    fireEvent.change(inputField, { target: { value: 'New task' } })

    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' })

    const addedTask = screen.getByText('New task')
    expect(addedTask).toBeTruthy()
  })

  it('should delete a task', () => {
    render(<TodoList />)

    const buttonCheck = screen.getByText('Тестовое задание')
    expect(buttonCheck).toBeTruthy()

    const buttonWrapper = buttonCheck.closest('li')
    const deleteButton = buttonWrapper?.querySelector(
      'button[aria-label="delete"]',
    ) as HTMLElement

    fireEvent.click(deleteButton)

    const deletedTask = screen.queryByText('Тестовое задание')
    expect(deletedTask).toBeNull()
  })

  it('should toggle task completion status', () => {
    render(<TodoList />)

    const buttonCheck = screen.getByText('Тестовое задание')
    expect(buttonCheck).toBeTruthy()

    const buttonWrapper = buttonCheck.closest('[role="button"]')
    expect(buttonWrapper).toBeTruthy()

    const checkboxInput = buttonWrapper?.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement | null
    expect(checkboxInput?.checked).toBeFalsy()

    fireEvent.click(buttonCheck)

    expect(checkboxInput?.checked).toBeTruthy()
  })

  it('should filter tasks by active status', async () => {
    render(<TodoList />)

    const taskList = screen.getByRole('list')
    expect(taskList).toBeTruthy()

    const allTasks = taskList.querySelectorAll('li')
    expect(allTasks.length).toEqual(3)

    const activeFilterButton = screen.getByTestId('button-active')
    expect(activeFilterButton).toBeTruthy()

    fireEvent.click(activeFilterButton)

    const activeTasks = taskList.querySelectorAll('li')
    expect(activeTasks.length).toEqual(2)
  })

  it('should filter tasks by completed status', () => {
    render(<TodoList />)

    const taskList = screen.getByRole('list')
    expect(taskList).toBeTruthy()

    const allTasks = taskList.querySelectorAll('li')
    expect(allTasks.length).toEqual(3)

    const completedFilterButton = screen.getByTestId('button-completed')
    expect(completedFilterButton).toBeTruthy()

    fireEvent.click(completedFilterButton)

    const completedTasks = taskList.querySelectorAll('li')
    expect(completedTasks.length).toEqual(1)
  })

  it('should clear completed tasks', () => {
    render(<TodoList />)

    const taskList = screen.getByRole('list')
    expect(taskList).toBeTruthy()

    const allTasks = taskList.querySelectorAll('li')
    expect(allTasks.length).toEqual(3)

    const clearCompletedButton = screen.getByTestId('clear-completed-button')
    expect(clearCompletedButton).toBeTruthy()

    fireEvent.click(clearCompletedButton)

    const remainingTasks = taskList.querySelectorAll('li')
    expect(remainingTasks.length).toEqual(2)
  })

  it('should show error message when adding a task with too short text', () => {
    render(<TodoList />)

    const inputField = screen.getByLabelText('What needs to be done?')

    fireEvent.change(inputField, { target: { value: 'A' } })

    fireEvent.keyDown(inputField, { key: 'Enter', code: 'Enter' })

    const errorMessage = screen.getByText('Minimum 3 characters required')
    expect(errorMessage).toBeTruthy()

    const addedTask = screen.queryByText('A')
    expect(addedTask).toBeNull()
  })
})
