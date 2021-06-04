import { React, useState } from 'react'
// import { Buttons } from './components/Buttons'

export function App() {
  let [current, setCurrent] = useState('0')
  let [base, setBase] = useState(0)

  function setNum(event) {
    setCurrent(
      current === '0'
        ? event.target.textContent === '.'
          ? (current += event.target.textContent)
          : event.target.textContent
        : (current += event.target.textContent)
    )
  }

  function clickOperation(event) {
    switch (event.target.textContent) {
      case '+':
        setBase((base += parseFloat(current)))
        break
      case '&minus;':
        setBase((base += parseFloat(current)))
        break
      case '&times;':
        setBase((base += parseFloat(current)))
        break
      case '&divide;':
        break
      case '=':
        break
    }
  }

  function clearAll() {
    setCurrent('0')
  }

  return (
    <>
      <main>
        <div className="calculator">
          <div className="display">{current}</div>
          <div className="buttons">
            <button onClick={clearAll} className="button clear">
              AC
            </button>
            <button onClick={clearAll} className="button divide">
              &divide;
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
            <button onClick={clearAll} className="button multiply">
              &times;
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
            <button onClick={clearAll} className="button minus">
              &minus;
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
            <button onClick={setNum} className="button plus">
              +
            </button>
            <button onClick={setNum} className="button zero">
              0
            </button>
            <button onClick={setNum} className="button decimal">
              .
            </button>
            <button onClick={clearAll} className="button equals">
              =
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
