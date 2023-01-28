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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
function CardDisplay (props) {
  let x = props.cards.map(x => false)
  const [flipped, setFlipped] = useState(x)
  const [cards, setCards] = useState(props.cards)
  const handleDelete = idx => {
    let newFlipped = flipped.filter((x, i) => i !== idx)
    setFlipped(newFlipped)
    setCards(cards.filter((x, i) => i !== idx))
    checkstuff()
  }
  const checkstuff = () => {
    console.log(flipped)
  }
  return (
    <div
      className='App'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '60vw'
      }}
    >
      {cards.map((x, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <button
            style={{
              height: '30px',
              width: '30px',
              backgroundColor: 'darksalmon',
              padding: 0,
              border: 'none',
            }}
            onClick={() => handleDelete(idx)}
          >
            <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
          </button>
          <ReactCardFlip isFlipped={flipped[idx]} flipDirection='vertical'>
            <Button
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
              style={{
                minWidth: 275,
                maxWidth: 300,
                textTransform: 'none',
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginBottom: '5vh'
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
                  Question{' '}
                </Typography>
              </div>

              <div>
                <Typography
                  style={{ padding: '10px', color: 'black' }}
                  component='div'
                >
                  {x.question}
                </Typography>
              </div>
            </Button>

            <Button
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
              style={{
                minWidth: 275,
                maxWidth: 300,
                textTransform: 'none',
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                Answer
              </Typography>
              <Typography
                style={{ padding: '10px', color: 'black' }}
                component='div'
              >
                {x.answered_question.substring(
                  0,
                  x.answered_question.indexOf('{')
                )}
                <b>
                  <mark>{x.answer}</mark>
                </b>
                {x.answered_question.substring(
                  x.answered_question.indexOf('}') + 2,
                  x.answered_question.length
                )}
              </Typography>
            </Button>
          </ReactCardFlip>
          <br></br>
        </div>
      ))}
    </div>
  )
}

export default CardDisplay
