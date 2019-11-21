import React, { useState, useEffect, useContext } from "react";
import StateContext from "../context";

const askEightBall = async question => {
  let params = encodeURIComponent(question);
  let uri = "https://8ball.delegator.com/magic/JSON/" + params;
  const response = await fetch(uri);
  const data = response.json();
  return data;
};

let id = 0;

const EightBall = () => {
  const [data, setData] = useState({});
  const [question, setQuestion] = useState("hello?");
  const [value, dispatch] = useContext(StateContext);

  const getData = async () => {
    const response = await askEightBall(question);
    setData(response.magic);
    id = id + 1;
    console.log("id is", id);
    dispatch({
      type: "add",
      addQuery: response.magic.question,
      addReply: response.magic.answer,
      addId: id
    });

    return {
      response
    };
  };

  const questionList = value.queries;

  // useEffect(() => {
  //   getData();
  // }, []);

  let updateInput = questionInput => {
    setQuestion(questionInput);
  };

  const handleAddQuestion = () => {
    getData(question);
    setQuestion("");
  };

  return (
    <>
      <div>
        <input onChange={e => updateInput(e.target.value)} value={question} />
        <button className="add-todo" onClick={handleAddQuestion}>
          Ask Away
        </button>
      </div>

      <div>
        {data.question}
        {data.answer}
      </div>

      <div>
        <table>
          <tbody>
            {questionList.map((question, index) => {
              return (
                <tr key={question.id}>
                  <td>
                    <h5>{question.query}</h5>
                  </td>
                  <td>
                    <h5>{question.reply}</h5>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EightBall;
