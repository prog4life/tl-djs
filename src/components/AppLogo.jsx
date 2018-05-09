import React from 'react';

import appLogo from '../assets/logo.png';

const AppLogo = () => (
  <div className="app-logo">
    <img className="app-logo__img" src={appLogo} alt="app logo" />
  </div>
);

export default AppLogo;