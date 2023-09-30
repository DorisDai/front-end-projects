const [questionList, setQuestionList] = useState([])
async function fetchQuizzes () {
    const data = await fetchAPI('/admin/quiz', 'GET');
    setQuizzesList(data.quizzes)
    data.quizzes.map(async (quiz)=>{

      const data2 = await fetchAPI(`/admin/quiz/${quiz.id}`, 'GET');
      setQuestionList([...questionList, {[quiz.id]: data2.questions.length}])
    })
  }