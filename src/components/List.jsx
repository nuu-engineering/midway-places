import React from 'react';

const List = ({ children }) => (
  <div className="w-dyn-list">
    <div role="list" className="w-dyn-items w-row">
      {children}
    </div>
  </div>
);

export default List;