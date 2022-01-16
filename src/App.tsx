import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './pages/home/home';
import Detail from './pages/detail/detail';
import Planner from './pages/planner/planner';
import Navbar from './components/navbar/navbar';
import Loading from './components/loading/loading'

import store from './redux/store';

// import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Loading />
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='/planner' element={<Planner />}></Route>
          </Routes>
      </BrowserRouter>
  </Provider>
  );
}

export default App;
