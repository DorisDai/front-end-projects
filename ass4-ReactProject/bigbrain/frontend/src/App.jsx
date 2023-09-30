import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import Dashboard from './Dashboard.jsx';
import QuizEdit from './QuizEdit.jsx'
import PlayJoin from './PlayJoin.jsx';
import Result from './Result.jsx';
// create a component file:
// x="Dashboard.jsx" && touch $x && code $x;
function App () {
  const [token, setToken] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<LoginForm setToken={setToken}/>}></Route>

          <Route path='/register' element={<RegisterForm setToken={setToken}/>}></Route>

          <Route path='/dashboard' element={<Dashboard token={token} setToken={setToken}/>}></Route>

          <Route path='/quizEdit/:quizId' element={<QuizEdit token={token} setToken={setToken}/>}></Route>

          <Route path='/playJoin/:sessionId?' element={<PlayJoin/>}></Route>

          <Route path='/result/:sessionId' element={<Result token={token} setToken={setToken}/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
