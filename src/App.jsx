import './App.css';
import { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import Home from './views/home';
import EditEmployee from './views/editEmployee';
import EmployeeList from './views/employeeList';

class App extends Component {

  render() {
    return (
      <div className='height-full-vh'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} >
              <Route index element={<EmployeeList />} />
              <Route path="/employee/add" element={<EditEmployee />} />
              <Route path="/employee/add/:empId" element={<EditEmployee />} />
            </Route>
          </Routes>
        </BrowserRouter>        
      </div>
    );
  }
}

export default App;
