import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import PageHeader from '../components/pageHeader';

class Home extends Component {

  render() {
    return (
      <div className='home'>
            <PageHeader></PageHeader>
            <div className='home-body'>
                <Outlet />
            </div>
      </div>
    );
  }
}

export default Home;
