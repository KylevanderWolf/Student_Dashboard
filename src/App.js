import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './Actions/actions'

function App() {

  const count = useSelector(state => state.counter)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <h1>this is the count: {count}</h1>
      <button onClick={() => dispatch(increment(10))}>Increment</button>
      <button onClick={() => dispatch(decrement(10))}>decrement</button>
    </div>
  );
}

export default App;
