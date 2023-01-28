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
  }

  const showQuestions = async e => {
    setFlipped(props.cards.map(x => false))
  }

  const showAnswers = async e => {
    setFlipped(props.cards.map(x => true))
  }

  const downloadFile = async => {
    const json=JSON.stringify(cards);
    const blob=new Blob([json],{type:'application/json'})
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'quickflash_save_'+ new Date()+'.json';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
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

    <div>
        <Button
          variant='contained'
          style={{
            backgroundColor: 'gray',
            marginLeft: 'auto',
            marginBottom: '5vh'
          }}
          onClick={showQuestions}>
          Show Questions
        </Button>
        <Button
          variant='contained'
          style={{
            backgroundColor: 'gray',
            marginLeft: 'auto',
            marginBottom: '5vh'
          }}
          onClick={showAnswers}>
          Show Answers
        </Button>
        <Button
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(cards)
            )}`}
          variant='contained'
          style={{
            backgroundColor: 'gray',
            marginLeft: 'auto',
            marginBottom: '5vh'
          }}
          download="quickflash_save_.json">
          Download Cards
        </Button>
        <Button
          variant='contained'
          style={{
            backgroundColor: 'gray',
            marginLeft: 'auto',
            marginBottom: '5vh'
          }}
          onClick={downloadFile}>
          Download Cards 2
        </Button>

          <br></br>
      </div>


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
