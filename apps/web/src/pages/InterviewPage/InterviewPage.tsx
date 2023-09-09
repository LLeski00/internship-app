import { Box } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { useRoute } from 'wouter';

import MultistepForm from '../../components/MultistepForm';
import { Path } from '../../constants/paths';
import { defaultInterviewValues, interviewQuestions, steps } from './data';
import InterviewQuestionHandler from './InterviewQuestionHandler';

import IntervieweeInfo from '../../components/IntervieweeInfo';

const mapAnswersToQuestions = (answers: FieldValues) => {
  return interviewQuestions.map((q) => ({ ...q, ...answers[q.id] }));
};

const InterviewPage = () => {
  const [, params] = useRoute(Path.Interview);
  const internId = params?.internId;

  const form = useForm<FieldValues>({
    defaultValues: defaultInterviewValues,
  });

  const handleFormSubmit = form.handleSubmit((d) =>
    console.log(internId, mapAnswersToQuestions(d)),
  );

  const setUrl = (image: string) => {
    console.log(image);
  };

  return (
    <Box maxWidth="1280px" margin="auto">
      <IntervieweeInfo
        setUrl={setUrl}
      />

      <MultistepForm
        questions={interviewQuestions}
        form={form}
        steps={steps}
        onSubmit={handleFormSubmit}
        InputHandler={InterviewQuestionHandler}
      />
    </Box>
  );
};

export default InterviewPage;
