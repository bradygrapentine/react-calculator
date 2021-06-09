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
  let [displayList, setDisplayList] = useState([])
  let [periodPresent, setPeriodPresent] = useState(false)
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  let operation = {
    '+': (oldResult, newNumber) => {
      return parseFloat(oldResult) + parseFloat(newNumber)
    },
    '-': (oldResult, newNumber) => {
      return parseFloat(oldResult) - parseFloat(newNumber)
    },
    '÷': (oldResult, newNumber) => {
      return parseFloat(oldResult) / parseFloat(newNumber)
    },
    x: (oldResult, newNumber) => {
      // not sure what's going on here, but it deletes the single quotes around 'x' when I save and multiplication works fine
      return parseFloat(oldResult) * parseFloat(newNumber)
    },
    '=': (oldResult) => {
      let currentNumAsFloat = parseFloat(currentNum)
      let oldResultAsFloat = parseFloat(oldResult)
      let newResult = operation[currentOperator](
        oldResultAsFloat,
        currentNumAsFloat
      )
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
      let newDisplayList = [...displayList, ' ', displayAsFloat, ' ', symbol]
      setDisplayList(newDisplayList)
    } else if (result && symbol != '=') {
      let newDisplayList = [result, ' ', symbol]
      setDisplayList(newDisplayList)
    } else {
      let displayAsFloat = parseFloat(display)
      setResult(displayAsFloat)
      let newDisplayList = [...displayList, ' ', displayAsFloat, ' ', symbol]
      setDisplayList(newDisplayList)
    }
    setOperator(symbol)
    setCurrentOperator(symbol)
    setDisplay('0')
    setPeriodPresent(false)
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function checkPeriod(e) {
    if (e.target.textContent == '.' && periodPresent) {
      setDisplay('ERROR')
      setDisplayList([])
      setResult(null)
      setOperator('')
      setCurrentOperator('')
      setCurrentNum(null)
      setResetDisplay(false)
      setIterating(false)
      setPeriodPresent(false)
      return
    } else if (e.target.textContent == '.') {
      setPeriodPresent(true)
    }
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function setNum(event) {
    if (operator === '=') {
      if (resetDisplay === true) {
        event.target.textContent === '.'
          ? setDisplay('0' + event.target.textContent)
          : setDisplay(event.target.textContent)
        let newResult = parseFloat(event.target.textContent)
        setResult(newResult)
        setResetDisplay(false)
        checkPeriod(event)
      } else {
        setDisplay((display += event.target.textContent))
        let newResult = parseFloat(display)
        setResult(newResult)
        checkPeriod(event)
      }
    } else if (display === '0') {
      event.target.textContent === '.'
        ? setDisplay((display += event.target.textContent))
        : setDisplay(event.target.textContent)
      checkPeriod(event)
    } else if (display === 'ERROR') {
      event.target.textContent === '.'
        ? setDisplay('0' + event.target.textContent)
        : setDisplay(event.target.textContent)
      checkPeriod(event)
    } else {
      setDisplay((display += event.target.textContent))
      checkPeriod(event)
    }
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function clickOperation(event) {
    switch (event.target.textContent) {
      // could use innerText instead of textContent, same effect
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
        handleOperation('÷')
        break
      case '=':
        if (iterating === false && operator !== '') {
          let displayAsFloat = parseFloat(display)
          setCurrentNum(displayAsFloat)
          setIterating(true)
        }
        let displayAsFloat = parseFloat(display)
        let newResult = 0
        if (operator === '=') {
          newResult = operation['='](result)
          let newDisplayList = [
            result,
            ' ',
            currentOperator,
            ' ',
            currentNum,
            ' =',
          ]
          setDisplayList(newDisplayList)
          setResult(newResult)
          setDisplay(newResult.toString())
          setOperator('=')
          setResetDisplay(true)
          setPeriodPresent(false)
        } else {
          newResult = operation[operator](result, displayAsFloat)
          let newDisplayList = [...displayList, ' ', displayAsFloat, ' =']
          setDisplayList(newDisplayList)
          setResult(newResult)
          setDisplay(newResult.toString())
          setOperator('=')
          setResetDisplay(true)
          setPeriodPresent(false)
        }
        break
    }
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function reset() {
    setDisplay('0')
    setDisplayList([])
    setResult(null)
    setOperator('')
    setCurrentOperator('')
    setCurrentNum(null)
    setResetDisplay(false)
    setIterating(false)
    setPeriodPresent(false)
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function toggleSign() {
    if (operator !== '=') {
      let newDisplay = -1 * parseFloat(display)
      if (!(Math.floor(newDisplay) === newDisplay)) {
        setDisplay(newDisplay.toString())
      } else if (newDisplay === 0) {
        setDisplay(newDisplay.toString())
      } else if (periodPresent) {
        setDisplay(newDisplay.toString() + '.')
      } else {
        setDisplay(newDisplay.toString())
      }
    } else {
      let newDisplay = -1 * parseFloat(display)
      if (!(Math.floor(newDisplay) === newDisplay)) {
        setDisplay(newDisplay.toString())
      } else if (newDisplay === 0) {
        setDisplay(newDisplay.toString())
      } else if (periodPresent) {
        setDisplay(newDisplay.toString() + '.')
      } else {
        setDisplay(newDisplay.toString())
      }
      setResult(newDisplay)
    }
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  function clearDisplay() {
    // if (operator === '=') {
    //   reset()
    // } else {
    setDisplay('0')
    setPeriodPresent(false)
    if (iterating) {
      setResult(0)
    }
    // }
  }
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  return (
    <>
      {/* <form> */}
      {/* might add a form around the calculator or display for the on submit feature */}
      <section>
        <div className="displayList">{displayList}</div>
        <div className="display">{display}</div>
      </section>
      <div className="buttons">
        <button onClick={reset} className="button reset">
          AC
        </button>
        <button onClick={clearDisplay} className="button clear">
          C
        </button>
        <button onClick={toggleSign} className="button toggleSign">
          +/−
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
      {/* </form> */}
    </>
  )
}
