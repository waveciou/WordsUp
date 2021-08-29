import * as React from 'react';
import { useSelector } from 'react-redux';

// Redux
import { RootState } from '../store';

// Component
import CollectedCard from '../components/CollectedCard';

// Functions
import handleGetHashId from '../src/functions/handleGetHashId';

// Style
import styles from '../styles/components/Collection.module.scss';

// Interface
import { IWordCase } from '../src/interfaces/I_WordCase';

const CollectionComponent: React.FC = () => {
  const words = useSelector((state: RootState) => state.wordsCollection.value);

  return (
    <>
      <h1 className="title">ALL OF THE ENGLISH WORDS</h1>
      <div className="content size-large">
        <ul className={styles.collectedList}>
          {
            words.map((word: IWordCase, index: number) => {
              const id: string = handleGetHashId(index);
              return (
                <li key={id}>
                  <CollectedCard word={word} />
                </li>
              );
            })
          }
        </ul>
      </div>
    </>
  );
};

export default CollectionComponent;
