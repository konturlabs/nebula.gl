import { createRoot } from 'react-dom/client';

import Example from './example';

const mountEl = document.createElement('div');
const root = createRoot(mountEl);

if (document.body) {
  document.body.style.margin = '0';
  document.body.appendChild(mountEl);
  root.render(<Example />);
}
