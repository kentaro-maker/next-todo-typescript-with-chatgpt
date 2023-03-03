import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useLocalStorage } from '@/hooks/useLocalStorage'

type Todo = {
  id: number
  text: string
}

const Root = styled('div')({
  margin: 16,
})

const Input = styled(TextField)({
  marginRight: 16,
})

export default function Home() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos',[])
  const [inputValue, setInputValue] = useState('')
  
  const handleAddTodo = () => {
    if (!inputValue) return
    const newTodo: Todo = {
      id: new Date().getTime(),
      text: inputValue,
    }
    setTodos([...todos, newTodo])
    setInputValue('')
  }
  
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <Root>
      <h1>Todo App</h1>
      <Input
        label="Add Todo"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddTodo}>
        Add
      </Button>
      <List>
        {todos?.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      }
      </List>
    </Root>
  )
}
