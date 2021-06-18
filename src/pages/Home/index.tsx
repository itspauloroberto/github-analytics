import React from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <p>
        This is Home.
      </p>
      <Link to="/repositories">Go to repos</Link>
    </div>
  );
}
