import React from 'react';

import Meta from '@/Components/utils/meta';
import { IProps } from '@/Interfaces/global';

const LayoutFailed: React.FC<IProps> = ({ children }) => (
  <>
    <Meta />
    <div className="content size-small bg-transparent">{children}</div>
  </>
);

export default LayoutFailed;
