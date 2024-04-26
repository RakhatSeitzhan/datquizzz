import './App.css';
import { useState } from 'react'
import { database } from './firebase';
import { ref, set } from "firebase/database";

function writeQuestion(question, answers, correctAnswer) {
  set(ref(database, 'questions/'), {
    question: question,
    answers: answers,
    correctAnswer, correctAnswer
  });
}
function App() {
  const startQuiz = () => {
    
  } 
  return (
    <div className="App">
      <MakeQuestion/>
    </div>
  );
}

function MakeQuestion(){
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState(['','','',''])
  const [correct, setCorrect] = useState('')
  const updateAnswers = (e, index) => {
    let temp = [...answers]
    temp[index] = e.target.value
    setAnswers(temp)
  }
  const uploadQuestion =  () => {
    writeQuestion(question, answers, correct)
    console.log(question, answers, correct)
  }
  return (
  <div>
    <input placeholder='question' value = {question} onChange={e => setQuestion(e.target.value)} />
    {answers.map((ans, index) => <input placeholder={`asnwer #${index+1}`} onChange={e => updateAnswers(e, index)} key = {index} value={ans}/>)}
    <input placeholder='correct answer' value={correct} onChange={e => setCorrect(e.target.value)}/>
    <button onClick={uploadQuestion}>Submit</button>
  </div>
  )
}

function Quiz(){
  const questions = [
    {
      question: 'Наурыздың екінші атауы қандай?/Как по другому называют праздник Наурыз?',
      answers: [
        'Ұлыстың ұлы түні',
        'Ұлыстың ұлы күні',
        'Ұлыс ұлының ұлы күні',
        'Ұлдың ұлыс күні'
      ],
      correct: 'Ұлыстың ұлы күні'
    },
    {
      question: 'Наурыз мейрамы екі сөзден құралған "нау" және "рыз". Олардың парсы тілінен аудармасы қандай?/Праздник Наурыз составное из двух слов "нау" и "рыз". Каков их перевод от фарси?  ',
      answers: [
        'ай-күн/луна-солнце',
        'ұлыс-күн/народ-день',
        'түн-күн/ночь-день',
        'жаңа-күн/новый-день'
      ],
      correct: 'жаңа-күн/новый-день'
    },
    {
      question: 'Қай елдерде (2 жауап) Наурыз мейрамы дымалыс күндері емес?/В каких странах (2 ответа) Наурыз не является выходным днем?',
      answers: [
        'Иран',
        'Ауғанстан/Афганистан',
        'Пәкістан/Пакистан',
        'Әзірбайжан/Азербайджан'
      ],
      correct: 'Пәкістан/Пакистан'
    },
    {
      question: 'Наурыз мейрамын ҚСРО кезінде реабилитацияны қалаған кім?/Кто инициировал реабилитацию Наурыза во времена СССР?',
      answers: [
        'Нұрсұлтан Назарбаев',
        'Мұхтар Шаханов',
        'Шерхан Мұртаза',
        'Дінмұхамед Қонаев'
      ],
      correct: 'Мұхтар Шаханов'
    },
    {
      question: 'Наурыз көже неше заттан жасалады?/Сколько продуктов входит в состав Наурыз коже?',
      answers: [
        '5',
        '6',
        '7',
        '8'
      ],
      correct: '7'
    },
    {
      question: 'Алтыбақан деген не?/Что такое Алтыбакан?',
      answers: [
        'Алты-түбі карусель/Шести-сторонная карусель',
        'Алты-сырық әткеншек/Шести-шестовая качель',
        'Алты-бақта ойналатын тығылмақ/Прятки на территории шести садов',
        'Алты адамнан алты бата алу/Получение шести благословления от шести человек'
      ],
      correct: 'Алты-сырық әткеншек/Шести-шестовая качель'
    },
    {
      question: 'Әдетте Наурызда дастарханха не қойылмайды?/Обычно что не ставится на стол во время Наурыза?',
      answers: [
        'Тоқаштар/Булочки',
        'Кәмпиттер/Конфеты',
        'Көкөністер/Овощи',
        'Құрт/Курт'
      ],
      correct: 'Көкөністер/Овощи'
    },
    {
      question: 'Наурыздың "бес игі іс"-ке не жатпайды (2 жауап)?/Что не входит в "пять благих обрядов" (2 ответа)?',
      answers: [
        'Үлкен кісілерге барып амандасу/Сходить и поприветствовать старших',
        'Ренжіткен адамнан кешірім сұрау/Попросить прощения у обиженных тобой людей',
        'Көрісу/Справиться о состоянии родственников которые живут далеко',
        'Жетімдерге көмек ету/Помочь сиротам'
      ],
      correct: 'Көрісу/Справиться о состоянии родственников которые живут далеко'
    },
    {
      question: 'Наурыз көже неше заттан жасалады?/Сколько продуктов входит в состав Наурыз коже?',
      answers: [
        '5',
        '6',
        '7',
        '8'
      ],
      correct: '7'
    },
  ]
  return (
  <div>

  </div>)
}
export default App;
