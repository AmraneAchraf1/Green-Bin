// FadeTransition.js

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/resident/fadeTransition.css'; // Import CSS for animations

function FadeTransition({ children, ...props }) {
  return (
    <CSSTransition {...props} timeout={500} classNames="fade">
      {children}
    </CSSTransition>
  );
}

export default FadeTransition;
