import { React, useState } from 'react'
// import { Buttons } from './components/Buttons'

export function App() {
  let [display, setDisplay] = useState('0')
  let [current, setCurrent] = useState(0)
  let [result, setResult] = useState(0)
  let [operator, setOperator] = useState('')

  function setNum(event) {
    if (display === '0') {
      event.target.textContent === '.'
        ? setDisplay((display += event.target.textContent))
        : setDisplay(event.target.textContent)
    } else if ((display = 'TEST')) {
      event.target.textContent === '.'
        ? setDisplay((display += event.target.textContent))
        : setDisplay(event.target.textContent)
      event.target.visibility = 'visible'
    } else if (parseFloat(display) === result) {
      setDisplay(event.target.textContent)
      setResult(0)
    }
  }

  function clickOperation(event) {
    switch (event.target.textContent) {
      case '+':
        setOperator('+')
        setResult(parseFloat(display))
        setDisplay('TEST')
        break
      case '-':
        setOperator('-')
        setResult(parseFloat(display))
        setDisplay('TEST')
        break
      case 'x':
        setOperator('x')
        setResult(parseFloat(display))
        setDisplay('TEST')
        break
      case '/':
        setOperator('/')
        setResult(parseFloat(display))
        setDisplay('TEST')
        break
      case '=':
        // if (display === ' 0' && (operator === '-' || operator === '+')) {
        //   setDisplay(result.toString())
        // } else if (display === ' 0' && (operator === '/' || operator === 'x')) {
        //   setDisplay('0')
        //   setResult(0)
        // }
        switch (operator) {
          case '/':
            setResult((result /= parseFloat(display)))
            setDisplay(result.toString())
            break
          case 'x':
            setResult((result *= parseFloat(display)))
            setDisplay(result.toString())
            break
          case '-':
            setResult((result -= parseFloat(display)))
            setDisplay(result.toString())
            break
          case '+':
            setResult((result += parseFloat(display)))
            setDisplay(result.toString())
            break
          case '=':
            setResult(0)
            setDisplay('0')
            break
        }
        setOperator('=')
        break
    }
  }

  function clearAll() {
    setDisplay('0')
    setResult(0)
  }

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
