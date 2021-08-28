import * as React from 'react';
import { useState } from 'react';

import Popup from '../components/common/Popup';

const HomeComponent: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="content">
      <div>Home</div>
      <button
        type="button"
        aria-label="btn"
        onClick={() => {
          setIsShow(true);
        }}
      >
        Open Popup
      </button>
      <Popup show={isShow} onClose={() => { setIsShow(false); }}>
        <p>123</p>
      </Popup>
    </div>
  );
};

export default HomeComponent;
