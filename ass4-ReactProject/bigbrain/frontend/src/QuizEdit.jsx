import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from './components/Nav';
import { Button, Space, Modal, Input, Card, Typography, Checkbox } from 'antd';
import fetchAPI from './components/APIcall';
import createForm from './components/form';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import createCard from './components/createCard';
import LongInputNumber from './components/longInputNumber';
const { Text } = Typography;
const { Meta } = Card;

let QcardId = 0;
// return a question container card
function createQuestionCard (question, clickDelete, showModal2) {
  QcardId += 1;
  return (
    <Card
      key={QcardId}
      style={{
        width: 300,
      }}
      // show question points
      extra={<Text type="secondary"> {question.questionPoints} points</Text>}

      // show delete question and edit question button
      actions={[
        <DeleteOutlined key="delete" onClick={clickDelete}/>,
        <EditOutlined key="edit" onClick={showModal2}/>,
      ]}
    >
      <Meta
        // show question as a string
        title={question.questionName}
        // show time limit
        description={`Time limit: ${question.timeLimit}s`}
      />
    </Card>
  )
}

export default function QuizEdit ({ setToken }) {
  const navigate = useNavigate();
  // check if user is a valid user
  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/')
    }
  }, [])
  // get current quiz id
  let quizId = useParams();
  quizId = quizId.quizId
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  const [quizzesList, setQuizzesList] = useState([])
  // get quizzes list
  async function getQuizzes () {
    const data = await fetchAPI('/admin/quiz', 'GET');
    setQuizzesList(data.quizzes);
  }

  // Eddit current quiz name, after user click submit of eddit quiz name, new quiz name is passed into 'values'
  const onFinish = async (values) => {
    const data = await fetchAPI(`/admin/quiz/${quizId}`, 'GET')
    const body = { questions: data.questions, thumbnail: data.thumbnail, name: values.name }
    fetchAPI(`/admin/quiz/${quizId}`, 'PUT', body)
    getQuizzes()
    handleCancel()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // after user submit add a question form, question form inputs are passed in to 'values'
  const onFinish2 = async (values) => {
    const data = await fetchAPI(`/admin/quiz/${quizId}`, 'GET')
    const newAnswers = []
    let aQuestion = {}
    const newQuestionsList = data.questions
    // store answers as answerString: true or false,
    // if this answer is one of the correct answer, set it to true
    Object.keys(answers).map((idType) => {
      const aAnswer = {}
      let checkedKey = idType
      let stringKey = idType
      idType.includes('Input') ? checkedKey = idType.replace('Input', 'Checkbox') : stringKey = idType.replace('Checkbox', 'Input')
      const answerString = answers[stringKey];
      answers[checkedKey] === undefined
        ? aAnswer[answerString] = false
        : aAnswer[answerString] = true
      if (idType.includes('Input')) {
        // create an array of answers
        newAnswers.push(aAnswer)
      }
      return aAnswer
    })
    // set Question format contains answer, points, time limit...
    aQuestion = { answers: newAnswers, ...values }
    newQuestionsList.push(aQuestion)

    const body = { questions: newQuestionsList, thumbnail: data.thumbnail, name: values.name }
    fetchAPI(`/admin/quiz/${quizId}`, 'PUT', body)
    handleCancel2()
  };
  const onFinishFailed2 = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    getQuizzes();
  }, [])

  // rerender after delete question buton clicked
  function clickDelete (quizId) {
    fetchAPI(`/admin/quiz/${quizId}`, 'DELETE')
    getQuizzes()
  }

  function clickEdit (quizId) {
    navigate(`/quizEdit/${quizId}`)
  }

  const [questionsList, setQuestionsList] = useState([]);
  useEffect(async () => {
    const data = await fetchAPI(`/admin/quiz/${quizId}`, 'GET')
    if (data.questions === questionsList) {
      console.log('hiii')
    } else {
      setQuestionsList(data.questions)
    }
  }, [questionsList])

  const [answers, setAnswers] = useState({})
  // when user enter a answer string into add a question form, set answers variable to store answers
  function onChange (answerIndex, type, value) {
    if (type === 'Checkbox' && value.target.checked === false) {
      let newAnswers = answers;
      answers[`${answerIndex} ${type}`] ? delete newAnswers[`${answerIndex} ${type}`] : newAnswers = answers
      setAnswers(newAnswers)
    } else {
      type === 'Checkbox'
        ? setAnswers({ ...answers, [`${answerIndex} ${type}`]: value.target.checked })
        : setAnswers({ ...answers, [`${answerIndex} ${type}`]: value.target.value })
    }
  }

  // structure of popup question form
  function QuestionModal () {
    return (
      <>
      <Button onClick={showModal2}>add  a question</Button>
        <Modal title="Add one question" open={isModalOpen2} footer={null} onCancel={handleCancel2}>
          {createForm(onFinish2, onFinishFailed2, [
            // question string field
            { lable: 'Enter a question', name: 'questionName', message: 'Question name is required', input: <Input/> },
            // time limit filed
            { lable: 'Time limit', name: 'timeLimit', message: 'Time limit is required', input: <LongInputNumber min={1} max={100000} placeholder={'in seconds'} /> },
            // question points field
            { lable: 'Question points', name: 'questionPoints', message: 'Question points is required', input: <LongInputNumber min={1} max={100} placeholder={'enter 1-100'} /> },
            // answer 1 field
            { input: <Checkbox onChange={(ele) => onChange(1, 'Checkbox', ele)}><Input placeholder='Enter an answer' onChange={(ele) => onChange(1, 'Input', ele)}/></Checkbox> },
            // answer 2 field
            { input: <Checkbox onChange={(ele) => onChange(2, 'Checkbox', ele)}><Input placeholder='Enter an answer' onChange={(ele) => onChange(2, 'Input', ele)}/></Checkbox> },
            // answer 3 field
            { input: <Checkbox onChange={(ele) => onChange(3, 'Checkbox', ele)}><Input placeholder='Enter an answer' onChange={(ele) => onChange(3, 'Input', ele)}/></Checkbox> },
            // answer 4 field
            { input: <Checkbox onChange={(ele) => onChange(4, 'Checkbox', ele)}><Input placeholder='Enter an answer' onChange={(ele) => onChange(4, 'Input', ele)}/></Checkbox> },
            // answer 5 field
            { input: <Checkbox onChange={(ele) => onChange(5, 'Checkbox', ele)}><Input placeholder='Enter an answer' onChange={(ele) => onChange(5, 'Input', ele)}/></Checkbox> },
            // answer 6 field
            { input: <Checkbox onChange={(ele) => onChange(6, 'Checkbox', ele)}><Input placeholder='Enter an answer' onChange={(ele) => onChange(6, 'Input', ele)}/></Checkbox> },
            // upload picture field
            {
              name: 'uploadPicture',
              input:
              <input accept="image/*" multiple type="file" />
            }
          ])}
        </Modal>
      </>
    )
  }
  return (
  <>
    <Space wrap>
      <Nav setToken={setToken}/>
      <Button onClick={showModal}>Edit this quiz name</Button>
        {/* Edit quiz name modal */}
        <Modal title="Edit current quiz" open={isModalOpen} footer={null} onCancel={handleCancel}>
          {createForm(onFinish, onFinishFailed, [{ lable: 'Game name', name: 'name', message: 'Please input game name', input: <Input/> }])}
        </Modal>
      {/* add a new question modal */}
      {QuestionModal()}

    </Space>
    <hr/>
    {
      quizzesList.map((quiz) => {
        // show current quiz card
        if (Number(quiz.id) === Number(quizId)) {
          return createCard('game thumbnail', quiz, () => clickDelete(quiz.id), () => clickEdit(quiz.id))
        }
        return (<></>)
      })
    }
    {/* below the line show this quiz's questions */}
    <hr/>
    <>This quiz has following questions</>
    {
      questionsList.map((question, index) => {
        // show question card for each question
        return createQuestionCard(question,
          () => {
            const newQList = questionsList
            newQList.splice(index, 1)
            fetchAPI(`/admin/quiz/${quizId}`, 'PUT', {
              questions: newQList,
            })
            setQuestionsList(questionsList)
          })
      }, showModal2)
    }
  </>
  )
}
