export const isSurveyIdValid = (surveyId) => {
  return /^\d+$/.test(surveyId);
};
