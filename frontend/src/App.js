import logo from './logo.svg'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CardDisplay from './CardDisplay'
import { styled } from '@mui/material/styles'
import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

function App () {
  const url = 'http://127.0.0.1:5000/generate'
  const [inputValue, setInputValue] = useState('')
  const [flashCards, setFlashCards] = useState([])
  const handleSubmit = async e => {
    const data = new FormData()
    data.append('text', inputValue)
    let response = await fetch(url, {
      method: 'post',
      body: data
    })
    let res = await response.json()
    res.forEach(e => setFlashCards(flashCards => [...flashCards, e]))
  }
  const handleChange = e => {
    setInputValue(e.target.value)
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <Typography variant='h4' component='h3' style={{ marginBottom: '5vh' }}>
          Welcome to QuickFlash!
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '50vw' }}>
          <TextField
            InputLabelProps={{
              style: {
                color: 'black'
              }
            }}
            label='Enter text!'
            multiline
            rows={10}
            variant='outlined'
            onChange={handleChange}
            style={{ flexGrow: 1 }}
          />
          <div className='break'></div>
          <Button
            variant='contained'
            style={{ backgroundColor: 'black', marginLeft: 'auto' }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
        {flashCards.length > 0 && <CardDisplay cards={flashCards} />}
      </header>
    </div>
  )
}

export default App
