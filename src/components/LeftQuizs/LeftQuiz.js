import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { scoreContext } from "../Home/Context";
import "./LeftQuiz.css";

function LeftQuiz() {
  const [score, setScore] = useContext(scoreContext);
  const navigate = useNavigate();
  const HomeComponent = () => {
    navigate("/");
  };
  const [state, setState] = useState(1);
  const [timer, setTimer] = useState(0);

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const generateRandomOptions = (multiply) => {
    let resultArray = [];
    let randomNumberArray = [];

    while (randomNumberArray.length <= 3) {
      let randomNumbers = randomNumber(10, 20);
      if (randomNumberArray.indexOf(randomNumbers) > -1) {
        continue;
      } else {
        randomNumberArray.push(randomNumbers);
      }
    }
    for (let i = 0; i < 3; i++) {
      let addSutract = randomNumber(0, 1);
      let result = multiply;
      if (addSutract === 1) {
        //add number from the result
        result += randomNumberArray[i];
        resultArray.push(result);
      } else {
        //substract number from the result
        result -= randomNumberArray[i];
        resultArray.push(result);
      }
    }
    return resultArray;
  };
  const playGame = () => {
    let field1 = randomNumber(1, 10);
    let field2 = randomNumber(1, 10);
    const getOperator = ["+", "-", "/", "*"];
    const rand = getOperator[(Math.random() * getOperator.length) | 0];
    var math_it_up = {
      "+": function (x, y) {
        return x + y;
      },
      "-": function (x, y) {
        return x - y;
      },
      "/": function (x, y) {
        return Math.round((x / y) * 100) / 100;
      },
      "*": function (x, y) {
        return x * y;
      },
    };
    let result = math_it_up[rand](field1, field2);
    let resultsArray = generateRandomOptions(result);
    resultsArray.push(result);
    resultsArray.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    let riddle = {
      resultArray: resultsArray,
      field1: field1,
      field2: field2,
      answer: result,
      rand: rand,
    };
    return riddle;
  };
  let riddles = playGame();

  const checkCorrectOption = (option) => {
    if (state !== 20) {
      if (riddles.answer === option) {
        setState(state + 1);
        setScore(score + 1);
      } else if (riddles.answer !== option) {
        setState(state + 1);
      }
    } else {
      HomeComponent();
    }
  };
  const renderOptions = () => {
    return (
      <div className="options">
        {riddles.resultArray &&
          riddles.resultArray.map((option, i) => (
            <div className="fields" key={i}>
              <div
                className="field-block"
                onClick={() => {
                  checkCorrectOption(option);
                  restart();
                }}
              >
                {option}
              </div>
            </div>
          ))}
      </div>
    );
  };

  useEffect(() => {
    const Interval = setInterval(() => {
      if (timer !== 21) {
        setTimer(timer + 1);
      }
    }, 20000);

    return () => clearInterval(Interval);
  });
  if (timer) {
    setState(state + 1);
    setTimer(0);
  }
  if (state === 21) {
    HomeComponent();
  }
  const restart = () => {
    setTimer(0);
  };

  useEffect(() => {
    setScore(0);
  }, []);

  return (
    <div className="Lquestion">
      <div className="quizContent">
        <h1>Question {state}</h1>
        <p className="question">
          <span>{riddles.field1}</span>
          {riddles.rand}
          <span>{riddles.field2}</span>
          <span>=</span> <span>?</span>
        </p>
        {renderOptions()}
        <div className="btns">
          <button
            className="btn_left"
            onClick={() => {
              setState(state + 1);
              restart();
            }}
          >
            Next
          </button>
          <button className="btn_Quit" onClick={HomeComponent}>
            Quit
          </button>
        </div>
        <h4>Score : {score}</h4>
      </div>
    </div>
  );
}

export default LeftQuiz;
