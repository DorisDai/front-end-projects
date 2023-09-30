import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Input, Modal } from 'antd';
import fetchAPI from './components/APIcall';
import createForm from './components/form';
import createCard from './components/createCard';
import Nav from './components/Nav';

const Dashboard = ({ setToken }) => {
  const navigate = useNavigate();
  const [quizzesList, setQuizzesList] = useState([])

  // get quizzes content, and figure out number of questions
  async function fetchQuizzes () {
    const data = await fetchAPI('/admin/quiz', 'GET');
    const promises = data.quizzes.map(async (quiz) => {
      const data2 = await fetchAPI(`/admin/quiz/${quiz.id}`, 'GET');
      // store number of questions in to quizzes item
      return { ...quiz, questions: data2.questions.length }
    })
    const questionCounts = await Promise.all(promises);
    setQuizzesList(questionCounts);
  }
  useEffect(() => {
    // check if user is a valid user
    if (localStorage.getItem('token') === null) {
      navigate('/')
    }
  }, [])

  useEffect(async () => {
    fetchQuizzes()
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // after user submit new game name, game name is passed in 'values'
  const onFinishCreateNewGame = (gameName) => {
    fetchAPI('/admin/quiz/new', 'POST', gameName)
    handleCancel()
    fetchQuizzes()
  };
  // delete quiz button is clicked
  function clickDelete (quizId) {
    fetchAPI(`/admin/quiz/${quizId}`, 'DELETE')
    fetchQuizzes()
  }
  // edit quiz button is clicked
  function clickEdit (quizId) {
    navigate(`/quizEdit/${quizId}`)
  }
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [sessionId, setSessionId] = useState('');
  // when start button is clicked, start this quiz
  async function startQuiz (quizid) {
    await fetchAPI(`/admin/quiz/${quizid}/start`, 'POST')
    const data = await fetchAPI(`/admin/quiz/${quizid}`, 'GET')
    setSessionId(data.active)
    // show a popup to show session id and allow user to copy the link to join the quiz
    setIsModalOpen2(true)
  }

  // when stop button is clicked, stop this quiz
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  async function stopQuiz (quizid) {
    await fetchAPI(`/admin/quiz/${quizid}/end`, 'POST')
    setIsModalOpen3(true)
  }

  async function showResults () {
    navigate(`/result/${sessionId}`)
  }
  return (
    <>
      <Space wrap>
        <Nav setToken={setToken}/>
        <Button onClick={showModal} name='newGameButton'>Create a new game</Button>
        {/* create a new game modal */}
        <Modal title="Create a new game:" open={isModalOpen} footer={null} onCancel={handleCancel}>
          {createForm(onFinishCreateNewGame, onFinishFailed, [{ lable: 'Game name', name: 'name', message: 'Game name is required', input: <Input name='enterGameNameField'/> }])}
        </Modal>

        {/* start quiz modal */}
        <Modal open={isModalOpen2} onOk={() => { setIsModalOpen2(false); }} onCancel={() => { setIsModalOpen2(false); }}>
          <p>Session Id: {sessionId}</p>
          <Button onClick={() => {
            let url = window.location.href
            // give the url to allow user to paste
            url = url.replace('dashboard', `playJoin/${sessionId}`)
            navigator.clipboard.writeText(url);
          }}>
            Click here to copy the link to join the game
          </Button>
        </Modal>

        {/* stop quiz modal */}
        <Modal title='Would you like to vie the results?' open={isModalOpen3} onOk={showResults} onCancel={() => { setIsModalOpen3(false); }}>

        </Modal>
      </Space>
      <hr/>
      {/* show quizzes content inside a card */}
      {quizzesList.map((quiz) => {
        return (
          createCard('game thumbnail', quiz, () => clickDelete(quiz.id), () => clickEdit(quiz.id), () => startQuiz(quiz.id), () => stopQuiz(quiz.id))
        )
      })}
    </>
  )
}

export default Dashboard;
