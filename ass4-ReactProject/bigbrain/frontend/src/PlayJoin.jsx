import createForm from './components/form';
import React from 'react';
import { Input } from 'antd';
import { useParams } from 'react-router-dom';
export default function PlayJoin () {
  function onFinish () {
    console.log('hiii')
  }
  function onFinishFailed () {
    console.log('hiii')
  }
  const { sessionId } = useParams();
  function getInput () {
    // if session id is parameterised in url, set this session id as default session id value
    if (sessionId !== undefined) {
      return <Input defaultValue={sessionId} placeholder='Join the game by entering session id'/>
    } else {
      return <Input placeholder='Join the game by entering session id'/>
    }
  }

  // a form to get session id and user name
  return (
    <>
      {createForm(onFinish, onFinishFailed, [{ lable: 'Session Id', name: 'sessionId', message: 'session id is required', input: getInput() },
        { lable: 'Your name', name: 'userName', message: 'Your name is required', input: <Input placeholder='Join the game by entering name'/> },])}
    </>
  )
}
