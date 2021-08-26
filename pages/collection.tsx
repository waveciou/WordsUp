import * as React from 'react';
import { useSelector } from 'react-redux';

// Redux
import { RootState } from '../store';

// Functions
import handleGetHashId from '../src/functions/handleGetHashId';

const CollectionComponent: React.FC = () => {
  const words = useSelector((state: RootState) => state.wordsCollection.value);

  return (
    <>
      <h1 className="title">所有單字列表</h1>
      <div className="content">
        {
          words.map((wordItem: IWordCase, index: number) => {
            const id: string = handleGetHashId(index);
            return (
              <div key={id}>
                <p>{ wordItem.english }</p>
                <p>{ wordItem.chinese }</p>
              </div>
            );
          })
        }
        <div>Collection</div>
      </div>
    </>
  );
};

export default CollectionComponent;
