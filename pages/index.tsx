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
      <button type="button" onClick={() => { dispatch(increment()); }}>increment</button>
      <div>{ count }</div>
      <button type="button" onClick={() => { dispatch(decrement()); }}>decrement</button>
    </div>
  );
};

export default HomeComponent;
