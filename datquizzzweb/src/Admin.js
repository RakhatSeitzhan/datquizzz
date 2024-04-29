import React from 'react'
import { database } from './firebase';
import { ref, set, onValue , update} from "firebase/database";
function Admin() {
    const startQuizz = () => {
        const quizzref = ref(database,'quizz')
        const updates = {};
        updates['start'] = true;
        update(quizzref, updates);
      }
      
      const stopQuizz = () => {
        const quizzref = ref(database,'quizz')
        const updates = {};
        updates['/start'] = false;
        update(quizzref, updates);
      }
  return (
    <div>
      <button onClick={startQuizz}>Start</button>
      <button onClick={stopQuizz}>Stop</button>
    </div>
  )
}

export default Admin
