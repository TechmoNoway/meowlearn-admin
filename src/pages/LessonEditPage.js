import { Typography, Stack, Autocomplete, TextField, Container, Box, Button } from '@mui/material';
import { useState } from 'react';
import Iconify from '../components/iconify';

function LessonEditPage() {
  const [questions, setQuestions] = useState([
    { id: 1, label: 'Question 1', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    { id: 2, label: 'Question 2', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    { id: 3, label: 'Question 3', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    { id: 4, label: 'Question 4', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    { id: 5, label: 'Question 5', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    { id: 6, label: 'Question 6', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    { id: 7, label: 'Question 7', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    { id: 8, label: 'Question 8', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    { id: 9, label: 'Question 9', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
    { id: 10, label: 'Question 10', sentence: '', correctAnswer: '', answer2: '', answer3: '', answer4: '' },
  ]);

  const [currentShowQuestion, setCurrentShowQuestion] = useState({});

  const handleChangeQuestionSentence = (newValue, index) => {
    const newQuestions = [...questions];
    newQuestions[index].sentence = newValue;
    setQuestions(newQuestions);
  };

  const handleChangeQuestionCorrectAnswer = (newValue, index) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = newValue;
    setQuestions(newQuestions);
  };

  const handleChangeQuestionAnswer2 = (newValue, index) => {
    const newQuestions = [...questions];
    newQuestions[index].answer2 = newValue;
    setQuestions(newQuestions);
  };

  const handleChangeQuestionAnswer3 = (newValue, index) => {
    const newQuestions = [...questions];
    newQuestions[index].answer3 = newValue;
    setQuestions(newQuestions);
  };

  const handleChangeQuestionAnswer4 = (newValue, index) => {
    const newQuestions = [...questions];
    newQuestions[index].answer4 = newValue;
    setQuestions(newQuestions);
  };

  const handleClearAllQuestionInfo = () => {
    const newQuestions = [...questions];
    const index = currentShowQuestion.id - 1;
    newQuestions[index].sentence = '';
    newQuestions[index].correctAnswer = '';
    newQuestions[index].answer2 = '';
    newQuestions[index].answer3 = '';
    newQuestions[index].answer4 = '';
    setQuestions(newQuestions);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
  };

  console.log(currentShowQuestion);

  return (
    <>
      <Container maxWidth="lg">
        <Stack>
          <Typography variant="h2">Lesson 1</Typography>

          <Stack direction="row" spacing={2} my={3}>
            <Autocomplete
              onChange={(event, value) => setCurrentShowQuestion(value)}
              disablePortal
              getOptionLabel={(question) => question.label}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              id="combo-box-demo"
              options={questions}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Choose question" />}
            />

            <Button sx={{ width: 140 }} variant="contained" component="label" startIcon={<Iconify icon="mdi:import" />}>
              Import <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
            </Button>

            <Button
              onClick={handleClearAllQuestionInfo}
              sx={{ width: 140 }}
              variant="contained"
              startIcon={<Iconify icon="icon-park-twotone:clear" />}
            >
              Clear
            </Button>
          </Stack>
        </Stack>

        {currentShowQuestion && (
          <>
            <TextField
              sx={{ marginY: 3, width: 700 }}
              variant="filled"
              placeholder="Question sentence go here"
              multiline
              rows={4}
              size="lg"
              value={currentShowQuestion.sentence}
              onChange={(e) => handleChangeQuestionSentence(e.target.value, currentShowQuestion.id - 1)}
            />

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Correct answer"
                variant="standard"
                value={currentShowQuestion.correctAnswer}
                onChange={(e) => handleChangeQuestionCorrectAnswer(e.target.value, currentShowQuestion.id - 1)}
              />
            </Box>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Answer 2"
                variant="standard"
                value={currentShowQuestion.answer2}
                onChange={(e) => handleChangeQuestionAnswer2(e.target.value, currentShowQuestion.id - 1)}
              />
            </Box>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Answer 3"
                variant="standard"
                value={currentShowQuestion.answer3}
                onChange={(e) => handleChangeQuestionAnswer3(e.target.value, currentShowQuestion.id - 1)}
              />
            </Box>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40ch' },
              }}
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Answer 4"
                variant="standard"
                value={currentShowQuestion.answer4}
                onChange={(e) => handleChangeQuestionAnswer4(e.target.value, currentShowQuestion.id - 1)}
              />
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default LessonEditPage;
