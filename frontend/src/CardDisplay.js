import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { styled } from '@mui/material/styles'
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions
} from '@mui/material'
import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
function CardDisplay (props) {
  let x = props.cards.map(x => false)
  const [flipped, setFlipped] = useState(x)
  console.log(flipped)
  return (
    <div className='App'>
      {props.cards.map((x, idx) => (
        <>
          <ReactCardFlip isFlipped={flipped[idx]} flipDirection='vertical'>
            <button
              onClick={() => {
                const newFlipped = flipped.map((x, i) => {
                  if (i === idx) {
                    return true
                  } else {
                    return x
                  }
                })
                setFlipped(newFlipped)
              }}
              style={{ minWidth: 275, maxWidth: 300 }}
            >
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                Question
              </Typography>
              <Typography component='div'>{x.question}</Typography>
            </button>

            <button
              onClick={() => {
                const newFlipped = flipped.map((x, i) => {
                  if (i === idx) {
                    return false
                  } else {
                    return x
                  }
                })
                setFlipped(newFlipped)
              }}
            >
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                Answer
              </Typography>
              <Typography component='div'>{x.answer}</Typography>
            </button>
          </ReactCardFlip>
          <br></br>
        </>
      ))}
    </div>
  )
}

export default CardDisplay
