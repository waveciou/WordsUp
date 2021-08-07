import * as React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { increment, decrement } from '../store/slice/counterSlice';

const HomeComponent: React.FC = () => {
  const count: number = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => {dispatch(increment())}}>increment</button>
        <div>{ count }</div>
        <button onClick={() => {dispatch(decrement())}}>decrement</button>
      </div>
    </div>
  )
}

export default HomeComponent;
