import { useEffect, useState } from 'react'
import './App.css'
import questionData from './question.json'

function App() {
  const [question,setQuestion] = useState(0);
  const [score,setScore] = useState(0);
  const [showscore,setShowScore] = useState(false);
  const [timer,setTimer] = useState(10)

  useEffect(()=>{
    let interval;
    if(timer > 0 && !showscore){
      interval = setInterval(()=>{
        setTimer((preTimer)=> preTimer - 1)
      },1000)   
    }else{
      clearInterval(interval)
      setShowScore(true)
    }
    return ()=> clearInterval(interval);
  },[timer,showscore])

  const crtAnswer = (selectedOptions) => {
    if(selectedOptions == questionData[question].correctOpt){
      setScore((prescore)=> prescore + 1)
    }
    if(question<questionData.length-1){
      setQuestion((preQues)=> preQues + 1)
      setTimer(10)
    }
    else{
      setShowScore(true)
    }
  }
  const restart = () => {
    setQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10)
  }
  return (
    <>
      <div className='quiz'>
        {showscore ? (
          <div className="score">
          <h2>Your Score : {score}/{questionData.length}</h2>
          <button onClick={restart}>Restart</button>
        </div>
        ) : (
          <div className="question">
          <h2>Question {question + 1}</h2>
          <p>{questionData[question].question}</p>
          <div className="options">
            {questionData[question].options.map((option,index) => (
              <button key={index} onClick={()=> crtAnswer(option)}>{option}</button>
            ))}
          </div>
          <div className="timer">Time Left : <span>{timer}s</span></div>
        </div>
        )}
        
      </div>
       
    </>
  )
}

export default App
