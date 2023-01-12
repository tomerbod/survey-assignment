const mockData = () => {
  console.log("mocked");
  localStorage.setItem("mocked", "true");

  localStorage.setItem(
    "surveys.9",
    '{"name":"s9","author":"s9","creationDate":"2023-01-09T13:20:27.327Z","id":9}'
  );
  localStorage.setItem(
    "surveys.10",
    '{"name":"dfdsf","author":"dsfdfs","creationDate":"2023-01-09T13:33:07.096Z","id":10}'
  );

  localStorage.setItem(
    "surveys.12",
    '{"name":"fgdgdf","author":"fgdfdg","creationDate":"2023-01-09T20:52:46.909Z","id":12}'
  );

  localStorage.setItem(
    "surveys.13",
    '{"name":"dsadsa","author":"dsaads","creationDate":"2023-01-09T20:59:10.986Z","id":13}'
  );

  localStorage.setItem(
    "surveys.14",
    '{"name":"sfd","author":"dsfsd","creationDate":"2023-01-09T22:04:41.535Z","id":14}'
  );

  /*
  localStorage.setItem(
    "surveys.16",
    '{"name":"lot-of-questions","author":"me","creationDate":"2023-01-10T07:31:04.380Z","id":16}'
  );
*/
  localStorage.setItem(
    "surveys.author",
    '[{"id":13,"author":"dsaads"},{"id":10,"author":"dsfdfs"},{"id":14,"author":"dsfsd"},{"id":12,"author":"fgdfdg"},{"id":9,"author":"s9"}]'
  );

  localStorage.setItem(
    "surveys.creationDate",
    '[{"id":9,"creationDate":"2023-01-09T13:20:27.327Z"},{"id":10,"creationDate":"2023-01-09T13:33:07.096Z"},{"id":12,"creationDate":"2023-01-09T20:52:46.909Z"},{"id":13,"creationDate":"2023-01-09T20:59:10.986Z"},{"id":14,"creationDate":"2023-01-09T22:04:41.535Z"}]'
  );

  localStorage.setItem(
    "surveys.name",
    '[{"id":10,"name":"dfdsf"},{"id":13,"name":"dsadsa"},{"id":12,"name":"fgdgdf"},{"id":9,"name":"s9"},{"id":14,"name":"sfd"}]'
  );

  localStorage.setItem("surveysAnswers.9.counter", "1");

  localStorage.setItem("surveysAnswers.9.1", '["a1", "a2"]');

  localStorage.setItem("surveysAnswers.10.counter", "5");

  localStorage.setItem("surveysAnswers.10.1", '["a1",["a1"]]');

  localStorage.setItem("surveysAnswers.10.2", '["a1",["a1"]]');

  localStorage.setItem("surveysAnswers.10.3", '["a1",["a1","a2"]]');

  localStorage.setItem("surveysAnswers.10.4", '["a1",["a2"]]');

  localStorage.setItem("surveysAnswers.10.5", '["a1",["a1","a2"]]');

  localStorage.setItem("surveysAnswers.12.counter", "1");

  localStorage.setItem("surveysAnswers.12.1", '["kjk"]');

  localStorage.setItem("surveysAnswers.13.counter", "2");

  localStorage.setItem("surveysAnswers.13.1", '["answer"]');

  localStorage.setItem("surveysAnswers.13.2", '["answer2"]');

  localStorage.setItem("surveysAnswers.14.counter", "1");

  localStorage.setItem("surveysAnswers.14.1", '["co"]');

  /*localStorage.setItem(
    "surveysAnswers.16",
    '[["a2","a1","a1",["a1","a2"],["a2","a3"],"a2","a1"],["a2","a1","a2",["a1","a2"],["a1"],"a2","a2"],["a3","a1","a1",["a1","a2"],["a3","a4"],"a1","a1"],["a2","a1","a1",["a1","a2"],["a3","a4"],"a1","a1"],["a2","a1","a1",["a1","a2"],["a1","a2"],"a1","a1"],["a2","a1","a1",["a1","a2"],["a1"],"a2","a1"]]'
  );
  */

  localStorage.setItem("surveysCreated", "16");

  localStorage.setItem(
    "surveysQuestions.9",
    '[{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q1"},{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q2"}]'
  );

  localStorage.setItem(
    "surveysQuestions.10",
    '[{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q1"},{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"multi","text":"q2"}]'
  );

  localStorage.setItem(
    "surveysQuestions.12",
    '[{"type":"open","possibleAnswersCounter":-1,"text":"fgddfg"}]'
  );

  localStorage.setItem(
    "surveysQuestions.13",
    '[{"type":"open","possibleAnswersCounter":-1,"text":"sdadsa"}]'
  );

  localStorage.setItem(
    "surveysQuestions.14",
    '[{"type":"open","possibleAnswersCounter":-1,"text":"dsfsfd"}]'
  );

  /*
  localStorage.setItem(
    "surveysQuestions.16",
    '[{"possibleAnswers":["a1","a2","a3"],"possibleAnswersCounter":3,"type":"closed","text":"q1"},{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q2"},{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q3"},{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"multi","text":"q4"},{"possibleAnswers":["a1","a2","a3","a4"],"possibleAnswersCounter":4,"type":"multi","text":"q5"},{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q6"},{"possibleAnswers":["a1","a2"],"possibleAnswersCounter":2,"type":"closed","text":"q7"}]'
  );
  */
};
