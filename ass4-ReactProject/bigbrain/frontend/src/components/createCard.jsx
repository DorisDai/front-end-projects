import React from 'react';
import { Card, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Text } = Typography;
const { Meta } = Card;

// create a quiz card
export default function createCard (imageAlt, quiz, clickDelete, clickEdit, startQuiz, stopQuiz) {
  return (
    <Card
      key={quiz.id}
      style={{
        width: 300,
      }}
      cover={
          <img
          alt={imageAlt}
          src={quiz.thumbnail}
          />
      }
      // show number of questions
      extra={<Text type="secondary"> {quiz.questions} questions</Text>}
      // delete quiz, edit quiz, start quiz, stop quiz buttons
      actions={[
        <DeleteOutlined key="delete" onClick={clickDelete}/>,
        <EditOutlined key="edit" onClick={clickEdit}/>,
        <a key='start' onClick={startQuiz}>Start</a>,
        <a key='Stop' onClick={stopQuiz}>Stop</a>
      ]}
    >
      <Meta
        // quiz name and total time to complete
        title={quiz.name}
        description={`total time to complete: ${quiz.createdAt}`}
      />
    </Card>
  )
}
