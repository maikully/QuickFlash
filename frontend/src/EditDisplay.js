import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { Button, Typography, TextField } from '@mui/material'
import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'

function EditDisplay (props) {
  const [original, setOriginal] = useState(props.card.original)
  const [answer, setAnswer] = useState(props.card.answer)
  const handleSave = () => {
    if (original.includes(answer)) {
      let answered_question =
        original.substring(0, original.indexOf(answer)) +
        '{{' +
        answer +
        '}}' +
        original.substring(
          original.indexOf(answer) + answer.length,
          original.length
        )
      let question =
        original.substring(0, original.indexOf(answer)) +
        '________' +
        original.substring(
          original.indexOf(answer) + answer.length,
          original.length
        )
      let card = {
        answer: answer,
        answered_question: answered_question,
        question: question,
        original: original
      }
      console.log(card)
      props.onEdit(card)
    } else {
      alert('Answer not found in question!')
    }
  }
  return (
    <div>
      <div
        className='App'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          width: '40vw'
        }}
      >
        <ReactCardFlip isFlipped={false} flipDirection='vertical'>
          <div
            style={{
              minWidth: 275,
              maxWidth: 300,
              minHeight: 300,
              textTransform: 'none',
              background: 'white',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '5vh',
              borderRadius: '5px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end'
              }}
            >
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                <TextField
                  InputLabelProps={{
                    style: {
                      color: 'black'
                    }
                  }}
                  label='Edit Question'
                  value={original}
                  multiline
                  rows={10}
                  variant='outlined'
                  onChange={e => setOriginal(e.target.value)}
                  style={{ flexGrow: 1 }}
                />
              </Typography>
            </div>
          </div>

          <div></div>
        </ReactCardFlip>

        <ReactCardFlip isFlipped={false} flipDirection='vertical'>
          <div
            style={{
              minWidth: 275,
              maxWidth: 300,
              minHeight: 300,
              textTransform: 'none',
              background: 'white',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '5vh',
              borderRadius: '5px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end'
              }}
            >
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                <TextField
                  InputLabelProps={{
                    style: {
                      color: 'black'
                    }
                  }}
                  label='Edit Answer'
                  value={answer}
                  multiline
                  rows={10}
                  variant='outlined'
                  onChange={e => setAnswer(e.target.value)}
                  style={{ flexGrow: 1 }}
                />
              </Typography>
            </div>
          </div>

          <div></div>
        </ReactCardFlip>
      </div>
      <Button
        variant='contained'
        style={{
          backgroundColor: 'black',
          marginLeft: 'auto',
          marginBottom: '2vh'
        }}
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  )
}

export default EditDisplay
