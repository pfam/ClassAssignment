import React from 'react';
import ReactDOM from 'react-dom';
import Country from './Country';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Country />, document.getElementById('root'));
registerServiceWorker();
