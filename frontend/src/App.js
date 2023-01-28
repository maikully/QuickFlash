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
import { responsiveProperty } from '@mui/material/styles/cssUtils'

function App () {
  const url = 'http://127.0.0.1:5000/generate'
  const [inputValue, setInputValue] = useState('')
  const [flashCards, setFlashCards] = useState([])
  const [mode, setMode] = useState(0)
  const handleSubmit = async e => {
    const data = new FormData()
    data.append('text', inputValue)
    let response = await fetch(url, {
      method: 'post',
      body: data
    })
    let res = await response.json()
    if (response.status != 200){
      alert(res.message)
    } else{
      res.forEach(e => setFlashCards(flashCards => [...flashCards, e]))
      if (res.length > 0) {
        setMode(2)
      }
    }
  }
  const handleBack = async e => {
    handleReset()
    setMode(0)
  }
  const handleChange = e => {
    setInputValue(e.target.value)
  }
  const handleReset = () => {
    setInputValue('')
    setFlashCards([])
  }

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (file != null) {
      const data = new FormData();
      data.append('file', file);

      let response = await fetch('http://127.0.0.1:5000/jsonupload',
        {
          method: 'post',
          body: data,
        }
      );
      let res = await response.json();
      if (response.status != 200){
        alert(res.message)
      } else{
        res.forEach(e => setFlashCards(flashCards => [...flashCards, e]))
        if (res.length > 0) {
          setMode(2)
        }
      }
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Typography
          variant='h4'
          component='h3'
          style={{ marginBottom: '5vh', marginTop: '5vh' }}
        >
          Welcome to QuickFlash!
        </Typography>
        {mode === 0 && (
          <div>
            <Button
              variant='contained'
              onClick={() => {
                setMode(1)
              }}
            >
              Create New Cards
            </Button>{' '}
            <Button variant='contained' component='label'>
              Upload File
              <input type='file' hidden onChange={uploadFile} />
            </Button>
          </div>
        )}
        {mode === 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '50vw' }}>
            <TextField
              InputLabelProps={{
                style: {
                  color: 'black'
                }
              }}
              label='Enter information to flashify!'
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
        )}
        <br></br>
        {mode === 2 && (
          <div>
            <CardDisplay cards={flashCards} />
            <Button
              variant='contained'
              style={{
                backgroundColor: 'gray',
                marginLeft: 'auto',
                marginBottom: '5vh'
              }}
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
