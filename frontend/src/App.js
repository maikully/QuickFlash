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
import FadeIn from 'react-fade-in'
import ReactCardFlip from 'react-card-flip'

function App () {
  const url = 'http://127.0.0.1:5000/generate'
  const [inputValue, setInputValue] = useState('')
  const [flashCards, setFlashCards] = useState([])
  const [mode, setMode] = useState(0)
  const [downloadData, setDownloadData] = useState(false)
  const [logoFlip, setLogoFlip] = useState(false)
  const [dummy, setDummy] = useState(0)

  function saveData () {
    const json = JSON.stringify(flashCards)
    const blob = new Blob([json], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
  }

  const handleSubmit = async e => {
    const data = new FormData()
    data.append('text', inputValue)
    let response = await fetch(url, {
      method: 'post',
      body: data
    })
    let res = await response.json()
    if (response.status != 200) {
      alert(res.message)
    } else {
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

  const uploadFile = async e => {
    setMode(1)
    const files = e.target.files
    if (files != null) {
      const data = new FormData()
      for (let i = 0; i < files.length; i++) {
        data.append('files', files[i])
      }

      let response = await fetch('http://127.0.0.1:5000/jsonupload', {
        method: 'post',
        body: data
      })
      let res = await response.json()
      if (response.status != 200) {
        alert(res.message)
      } else {
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
        <FadeIn>
          <ReactCardFlip isFlipped={logoFlip} flipDirection='vertical'>
            <Button
              onClick={() => {
                setLogoFlip(true)
              }}
              style={{
                textTransform: 'none',
                background: '#c7b299',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <img
                src='QuickFlashLogo.png'
                alt='QuickFlashLogo'
                width='500px'
              ></img>
            </Button>

            <Button
              onClick={() => {
                setLogoFlip(false)
              }}
              style={{
                textTransform: 'none',
                background: '#c7b299',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <img
                src='QuickFlashLogo2.png'
                alt='QuickFlashLogo'
                width='500px'
              ></img>
            </Button>
          </ReactCardFlip>
        </FadeIn>
      </header>
      <header className='App-body'>
        {(mode === 0  || mode === 2) && (
          <FadeIn>
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
                Upload Files
                <input type='file' hidden multiple onChange={uploadFile} />
              </Button>
            </div>
          </FadeIn>
        )}
        {mode === 1 && (
          <FadeIn>
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
          </FadeIn>
        )}
        <br></br>
        {(mode === 2) && (
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
