import './App.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {
  Button,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import ClearIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import EditDisplay from './EditDisplay'
import FadeIn from 'react-fade-in/lib/FadeIn'
function CardDisplay (props) {
  let x = props.cards.map(x => false)
  const [flipped, setFlipped] = useState(x)
  const [cards, setCards] = useState(props.cards)
  const [editing, setEditing] = useState(false)
  const [editingCard, setEditingCard] = useState()
  const handleDelete = idx => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      let newFlipped = flipped.filter((x, i) => i !== idx)
      setFlipped(newFlipped)
      setCards(cards.filter((x, i) => i !== idx))
    }
  }
  const handleEdit = card => {
    setEditing(true)
    setEditingCard(card)
  }
  const handleEdited = card => {
    let idx = cards.indexOf(editingCard)
    let newCards = cards.slice(0, idx)
    console.log(newCards)
    newCards.push(card)
    newCards = newCards.concat(cards.slice(idx + 1, cards.length))
    setCards(newCards)
    setEditing(false)
  }
  const handleAdd = card => {
    setEditing(true)
    let newCard = {
      answer: '',
      question: '',
      original: '',
      answered_question: ''
    }
    let newCards = cards
    newCards.push(newCard)
    setEditingCard(newCard)
    let newFlips = flipped
    newFlips.push(false)
    setFlipped(newFlips)
  }
  const showQuestions = () => {
    setFlipped(props.cards.map(x => false))
  }
  const showAnswers = () => {
    setFlipped(props.cards.map(x => true))
  }

  const downloadFile = async => {
    const json = JSON.stringify(cards)
    const blob = new Blob([json], { type: 'application/json' })
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    let rightNow = new Date()
    rightNow = rightNow.toString()
    link.download =
      'quickflash_save_' +
      rightNow.substring(0, rightNow.indexOf('(') - 1) +
      '.json'

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
  }

  return (
    <div
      className='App'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '60vw'
      }}
    >
      {!editing && (
        <>
          <FadeIn>
            <div>
              <Button
                variant='contained'
                style={{
                  backgroundColor: 'gray',
                  marginBottom: '5vh'
                }}
                onClick={showQuestions}
              >
                Show Questions
              </Button>{' '}
              <Button
                variant='contained'
                style={{
                  backgroundColor: 'gray',
                  marginBottom: '5vh'
                }}
                onClick={showAnswers}
              >
                Show Answers
              </Button>{' '}
              <Button
                variant='contained'
                style={{
                  backgroundColor: 'gray',
                  marginBottom: '5vh'
                }}
                onClick={downloadFile}
              >
                Download Cards
              </Button>
            </div>
          </FadeIn>

          <div className='break'></div>

          {cards.map((x, idx) => (
            <FadeIn>
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '30px'
                  }}
                >
                  <button
                    style={{
                      height: '30px',
                      width: '30px',
                      backgroundColor: 'darksalmon',
                      padding: 0,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleDelete(idx)}
                  >
                    <ClearIcon></ClearIcon>
                  </button>
                  <button
                    style={{
                      height: '30px',
                      width: '30px',
                      backgroundColor: 'lightblue',
                      padding: 0,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleEdit(x)}
                  >
                    <EditIcon></EditIcon>
                  </button>
                </div>
                <ReactCardFlip
                  isFlipped={flipped[idx]}
                  flipDirection='vertical'
                >
                  <Button
                    className='card'
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
                      minHeight: 300,
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
                    className='card'
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
                      minHeight: 300,
                      textTransform: 'none',
                      background: 'white',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginBottom: '5vh'
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
                        x.answered_question.indexOf('{{')
                      )}
                      <b>
                        <mark>{x.answer}</mark>
                      </b>
                      {x.answered_question.substring(
                        x.answered_question.indexOf('}}') + 2,
                        x.answered_question.length
                      )}
                    </Typography>
                  </Button>
                </ReactCardFlip>
                <br></br>
              </div>
            </FadeIn>
          ))}
          <div className='break'></div>
          <Button
            style={{
              marginBottom: '2vh'
            }}
            variant='contained'
            onClick={handleAdd}
          >
            Add Card
          </Button>
        </>
      )}
      {editing && <EditDisplay card={editingCard} onEdit={handleEdited} />}
    </div>
  )
}

export default CardDisplay
