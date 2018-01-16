import React from 'react';

import Header from '../components/Header/Header';

const withApp = (Child) => {
  const WrappedComponent = props => (
    <div>
      <Header />
      <main>
        <Child {...props} />
      </main>
    </div>
  );

  return WrappedComponent;
};

export default withApp;
