import './App.css';
import { useEffect, useRef, useState } from 'react'
import { database } from './firebase';
import { ref, set, onValue , update} from "firebase/database";
import { questions } from './quizzquestions';
import Login from './Login';
import LightningIcon from './LightningIcon';
import MoonIcon from './MoonIcon'
import ShieldIcon from './ShieldIcon';
import CakeIcon from './CakeIcon';
import jiffka from './jiffka.gif';
function App() {
  const [userName, setUsername ] = useState('')
  const [quizz, setquizz] = useState()
  useEffect(() => {
    const quizzref = ref(database,'quizz');
    onValue(quizzref, snapshot => {
      const data = snapshot.val();
      setquizz(data)
    })
  }, [])
  
  const handleJoin = (name) => {
    setUsername(name)
    const userRef = ref(database, `users/${name}`)
    set(userRef, {
      lastResult: 0
    });
  }
  return (
    <div className="App">
      {!quizz?.start && userName != '' && <TimerAnim></TimerAnim>}
      {userName == '' && <Login handleJoin = {handleJoin}  setUsername = {setUsername}></Login>}
      {quizz?.start && <Quiz userName={userName} quizz = {quizz}></Quiz>}

    </div>
  );
}

function Quiz({quizz, userName}){
  const [current, _setCurrent] = useState(0)

  const m = <MoonIcon></MoonIcon>
  const l = <LightningIcon></LightningIcon>
  const c = <CakeIcon></CakeIcon>
  const s = <ShieldIcon></ShieldIcon>
  const icons = [m,l,c,s]
  const currentRef = useRef(current)
  const setCurrent = (newval) => {
    _setCurrent(newval)
    currentRef.current = newval
  }
  const timePerQuestion = 15 * 1000
  const timeBetween = 5 * 1000
  const [ show, setShow ] = useState(false)
  const [end, setEnd ] = useState(false)
  useEffect(() => {
    let interval2
    setTimeout(() => {
      setShow(true)
      interval2 = setInterval(() => {
        setShow(true)
      },  timeBetween + timePerQuestion)
    }, timePerQuestion)
    const interval = setInterval(() => {
      if (currentRef.current < questions.length-1){
        setCurrent(currentRef.current+1)
        setBlock(false)
        setShow(false)
      }
    }, timePerQuestion+timeBetween)
    setTimeout(() => {
      setEnd(true)
      submitResults()
    }, questions.length * timeBetween + questions.length * timePerQuestion)
    
    
    return () => {
      clearInterval(interval)
      clearInterval(interval2)
    }
    
  }, [])

  const results = useRef(0)
  const [block, setBlock] = useState(false) 
  const handlePressAnwer = (index, ans) => {
    if (questions[index].correct == ans) results.current = results.current+1
    setBlock(true)
    setChosen(ans)
  }
  const submitResults = () => {
    const userRef = ref(database, `users/${userName}`)
    const updates = {};
    updates['lastResult'] = results.current;
    update(userRef, updates);
  }
  const [chosen, setChosen] = useState()
  return (
    <div>
      {!end && 
        <div className="container">
        <div className="card mt-4">
          {!show && <ProgressBar></ProgressBar>}
          <div className="card-body bg-light">
            <div className="card-title" style={{fontWeight: 'bold', padding: '10px'}}><small className="text-body-secondary">kz: </small>{questions[current].question}</div>
            <div className="card-title" style={{fontWeight: 'bold', padding: '10px'}}><small className="text-body-secondary">ru: </small>{questions[current].questionru}</div>
            {!show &&
              <div className="row">
              {questions[current].answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="col-md-6 mb-2">
                  <button
                  disabled = {block} 
                  onClick={e => handlePressAnwer(current, answer)}
                    type="button"
                    style={{
                      width: '100%',
                      height: '120px',
                      borderRadius: '10px',
                      backgroundColor: ['#dc3545', '#0d6efd', '#ffc107', '#198754'][answerIndex % 4],
                      fontWeight: 'bold',
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                      color:'white',
                      fontSize:'1.5rem'
                    }}
                    className="btn btn-outline-light flex items-center content-center"
                  >
                    {icons[answerIndex%4]}
                    {answer}
                  </button>
                </div>
              ))}
            </div>
            }
            {show && 
            <div style={{display:'flex',height:'5rem', flexDirection:'column',width: '70%', margin:'auto 0px',}}>
              {questions[current].correct == chosen ? 
              <div style = {{fontSize:'1.5rem',background: 'green', color:'white'}}>От души родной ты ответил правильно я в тебя верил! Правильный ответ:{questions[current].correct}</div>
              : 
              <div style = {{fontSize:'1.5rem',background: 'red',  color:'white'}}>НЕПРАВИЛЬНО! Правильный ответ это: {questions[current].correct}</div> 
              }
            </div>}
          </div>
        </div>
    </div>
    }
    {end && <Results></Results>}
    
  </div>)
}

function Results(){
  const [ users, setUsers ] = useState([])
  useEffect(() => {
    const usersRef = ref(database, 'users')
    onValue(usersRef, snapshot => {
      const data = snapshot.val()
      let temp =  Object.keys(data).map(key => ({name: key, lastResult: data[key].lastResult}))
      temp.sort((a, b) => b.lastResult - a.lastResult);
      setUsers(temp)
    })
  },[])
  return (
  <div>
    <div>
      <h2 style={{color:'gold'}}>First place</h2>
      <h1>{users[0]?.name}</h1>
    </div>
    <div>
      <h2 style={{color:'silver'}}>Second place</h2>
      <h1>{users[1]?.name}</h1>
    </div>
    <div>
      <h2 style={{color:'bronze'}}>Third place</h2>
      <h1>{users[2]?.name}</h1>
    </div>
  </div>
  )
}
const ProgressBar = () => {
  return (
    <div style={{ width: '100%', backgroundColor: '#ccc', height: '20px' }}>
      <div
        style={{
          // width: `${progress}%`,
          backgroundColor: 'green',
          height: '100%',
          transition: 'width 1s linear' // Smooth transition animation
        }} 
        className='progressbar'
      />
    </div>
  );
};
function TimerAnim(){
  return (
      <div>
        <div id="rax">
    <button id="at" class="btn btn-primary" type="button" disabled>
      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Loading...</span>
    </button>
        </div>
        <div id="silver" class="text-primary">
          подождите пока все не загрузятся :0
        </div>
        <div>
          <img src={jiffka}></img>
        </div>
      </div>
  )
}
export default App;
