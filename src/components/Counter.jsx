import { useState, useRef } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);
  const isRunning  = useRef(false);

  const incrementCount = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    })
  }

  const recursiveFun = () => {
    incrementCount().then(() => {
      setCount(count => count  + (incrementValue ? incrementValue : 1 ));
  
      if (isRunning.current) {
        recursiveFun();
      }
    }).catch(err => console.log(err))
  }

  const handleStartStopClick = (e) => {
    isRunning.current = !isRunning.current

    if (isRunning.current) {
      recursiveFun();
    }
  }

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) {
      setIncrementValue(null)
    } else {
      setIncrementValue(value)
    }
  }

  return (
    <div className="mt-5">
      <div className="center_div">
        <h4> Simple React Counter</h4>
        <h3>{count}</h3>

        <div className="row mb-3">
          <div className="col">
            <input type="text" 
              className="form-control" 
              name="incrementStep" 
              value={incrementValue} 
              onChange={handleStepChange} />
          </div>
        </div>

        <div className="row"> 
          <div className="col">
            <button onClick={handleStartStopClick} className="btn btn-success me-3">Start/Stop</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Counter;