import logo from './logo.svg'
import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { styled } from '@mui/material/styles'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'

function App () {
  const url = 'http://127.0.0.1:5000'
  const [inputValue, setInputValue] = useState('')
  const handleSubmit = async e => {
    let response = await fetch(url, {
      method: 'post',
      body: inputValue
    })
    let res = await response.json()
    console.log(res)
  }
  const handleChange = e => {
    setInputValue(e.target.value)
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          <code>Welcome to QuickFlash!</code>
        </p>
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
      </header>
    </div>
  )
}

export default App
