import { React, useState } from 'react'
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
export function App() {
  let [display, setDisplay] = useState('0')
  let [currentOperator, setCurrentOperator] = useState('')
  let [currentNum, setCurrentNum] = useState(null)
  let [result, setResult] = useState(null)
  let [operator, setOperator] = useState('')
  let [resetDisplay, setResetDisplay] = useState(false)
  let [iterating, setIterating] = useState(false)
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  let operation = {
    '+': (oldResult, newNumber) => {
      return oldResult + newNumber
    },
    '-': (oldResult, newNumber) => {
      return oldResult - newNumber
    },
    '/': (oldResult, newNumber) => {
      return oldResult / newNumber
    },
    x: (oldResult, newNumber) => {
      // not sure what's going on here, but it deletes the single quotes around 'x' when I save and multiplication works fine
      return oldResult * newNumber
    },
    '=': (oldResult) => {
      let currentNumAsFloat = parseFloat(currentNum)
      let newResult = operation[currentOperator](oldResult, currentNumAsFloat)
      return newResult
    },
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function handleOperation(symbol) {
    setIterating(false)
    if (result && operator !== '=') {
      let displayAsFloat = parseFloat(display)
      let newResult = operation[operator](result, displayAsFloat)
      setResult(newResult)
    } else {
      setResult(parseFloat(display))
    }
    setDisplay('0')
    setOperator(symbol)
    setCurrentOperator(symbol)
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function setNum(event) {
    if (operator === '=') {
      if (resetDisplay === true) {
        setDisplay(event.target.textContent)
        let newResult = parseFloat(event.target.textContent)
        setResult(newResult)
        setResetDisplay(false)
      } else {
        setDisplay((display += event.target.textContent))
        let newResult = parseFloat(display)
        setResult(newResult)
      }
    } else if (display === '0') {
      event.target.textContent === '.'
        ? setDisplay((display += event.target.textContent))
        : setDisplay(event.target.textContent)
    } else {
      setDisplay((display += event.target.textContent))
    }
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function clickOperation(event) {
    switch (event.target.textContent) {
      case '+':
        handleOperation('+')
        break
      case '-':
        handleOperation('-')
        break
      case 'x':
        handleOperation('x')
        break
      case '/':
        handleOperation('/')
        break
      case '=':
        if (iterating === false) {
          setCurrentNum(display)
          setIterating(true)
        }
        let displayAsFloat = parseFloat(display)
        let newResult = 0
        if (operator === '=') {
          newResult = operation['='](result)
        } else {
          newResult = operation[operator](result, displayAsFloat)
        }
        setResult(newResult)
        setDisplay(newResult.toString())
        setOperator('=')
        setResetDisplay(true)
        break
    }
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function clearAll() {
    setDisplay('0')
    setResult(null)
    setOperator('')
    setCurrentOperator('')
    setCurrentNum(null)
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  return (
    <>
      <main>
        <div className="calculator">
          <div className="display">{display}</div>
          <div className="buttons">
            <button onClick={clearAll} className="button clear">
              AC
            </button>
            <button onClick={clickOperation} className="button divide">
              /
            </button>
            <button onClick={setNum} className="button seven">
              7
            </button>
            <button onClick={setNum} className="button eight">
              8
            </button>
            <button onClick={setNum} className="button nine">
              9
            </button>
            <button onClick={clickOperation} className="button multiply">
              x
            </button>
            <button onClick={setNum} className="button four">
              4
            </button>
            <button onClick={setNum} className="button five">
              5
            </button>
            <button onClick={setNum} className="button six">
              6
            </button>
            <button onClick={clickOperation} className="button minus">
              -
            </button>
            <button onClick={setNum} className="button one">
              1
            </button>
            <button onClick={setNum} className="button two">
              2
            </button>
            <button onClick={setNum} className="button three">
              3
            </button>
            <button onClick={clickOperation} className="button plus">
              +
            </button>
            <button onClick={setNum} className="button zero">
              0
            </button>
            <button onClick={setNum} className="button decimal">
              .
            </button>
            <button onClick={clickOperation} className="button equals">
              =
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
