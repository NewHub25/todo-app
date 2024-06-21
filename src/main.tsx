import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './todomvc.css';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/todo-app/*' element={<App />} />
        <Route
          path='*'
          element={(() => {
            redirect('/todo-app/*');
            return <p></p>;
          })()}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
