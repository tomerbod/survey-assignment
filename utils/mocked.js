export const mockData = () => {
  console.log("mocked");
  Object.entries(mockedData).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

const mockedData = {
  mocked: "true",

  "surveys.9":
    '{"name":"s9","author":"s9","creationDate":"2023-01-09T13:20:27.327Z","id":9}',

  "surveys.10":
    '{"name":"dfdsf","author":"dsfdfs","creationDate":"2023-01-09T13:33:07.096Z","id":10}',

  "surveys.12":
    '{"name":"fgdgdf","author":"fgdfdg","creationDate":"2023-01-09T20:52:46.909Z","id":12}',

  "surveys.13":
    '{"name":"dsadsa","author":"dsaads","creationDate":"2023-01-09T20:59:10.986Z","id":13}',

  "surveys.14":
    '{"name":"sfd","author":"dsfsd","creationDate":"2023-01-09T22:04:41.535Z","id":14}',

  "surveys.author":
    '[{"id":13,"author":"dsaads"},{"id":10,"author":"dsfdfs"},{"id":14,"author":"dsfsd"},{"id":12,"author":"fgdfdg"},{"id":9,"author":"s9"}]',

  "surveys.creationDate":
    '[{"id":9,"creationDate":"2023-01-09T13:20:27.327Z"},{"id":10,"creationDate":"2023-01-09T13:33:07.096Z"},{"id":12,"creationDate":"2023-01-09T20:52:46.909Z"},{"id":13,"creationDate":"2023-01-09T20:59:10.986Z"},{"id":14,"creationDate":"2023-01-09T22:04:41.535Z"}]',
  "surveys.name":
    '[{"id":10,"name":"dfdsf"},{"id":13,"name":"dsadsa"},{"id":12,"name":"fgdgdf"},{"id":9,"name":"s9"},{"id":14,"name":"sfd"}]',
  "surveysAnswers.9.counter": "1",

  "surveysAnswers.9.1": '["a1", "a2"]',

  "surveysAnswers.10.counter": "5",

  "surveysAnswers.10.1": '["a1",["a1"]]',

  "surveysAnswers.10.2": '["a1",["a1"]]',

  "surveysAnswers.10.3": '["a1",["a1","a2"]]',

  "surveysAnswers.10.4": '["a1",["a2"]]',

  "surveysAnswers.10.5": '["a1",["a1","a2"]]',

  "surveysAnswers.12.counter": "1",

  "surveysAnswers.12.1": '["kjk"]',

  "surveysAnswers.13.counter": "2",

  "surveysAnswers.13.1": '["answer"]',

  "surveysAnswers.13.2": '["answer2"]',

  "surveysAnswers.14.counter": "1",

  "surveysAnswers.14.1": '["co"]',

  surveysCreated: "16",

  "surveysQuestions.9":
    '[{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q1"},{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q2"}]',
  "surveysQuestions.10":
    '[{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q1"},{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"multi","text":"q2"}]',
  "surveysQuestions.12":
    '[{"type":"open","possibleAnswersCounter":-1,"text":"fgddfg"}]',
  "surveysQuestions.13":
    '[{"type":"open","possibleAnswersCounter":-1,"text":"sdadsa"}]',
  "surveysQuestions.14":
    '[{"type":"open","possibleAnswersCounter":-1,"text":"dsfsfd"}]',
};
