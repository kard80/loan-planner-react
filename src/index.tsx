import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/home/home';
import Detail from './pages/detail/detail';
import Login from './pages/login';
import Navbar from './components/navbar/navbar';

import './index.less';

ReactDOM.render(
  <div>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
