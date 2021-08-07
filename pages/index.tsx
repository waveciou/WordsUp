import * as React from 'react';
import Head from 'next/head';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { increment, decrement } from '../store/slice/counterSlice';

const Home: React.FC = () => {
  const count: number = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <p>123</p>
      <div>
        <button onClick={() => { dispatch(increment()) }}>increment</button>
        <div>{ count }</div>
        <button onClick={() => { dispatch(decrement()) }}>decrement</button>
      </div>
    </div>
  )
}

export default Home;
