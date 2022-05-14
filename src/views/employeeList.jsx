import { Modal, Button, List, Pagination } from 'antd';
import Search from 'antd/lib/input/Search';
import { Component } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Employee } from '../services/employee';
import { withRouter } from '../utils/with-router';

class EmployeeList extends Component {

  constructor () {
    super();

    this.state = {
      page : 1  ,
      totalEmployees : 1,
      pageSize : 8,
      searchString : '',
      data : []
    }
  }

  async componentDidMount() {
    this.getEmployees();
  }

  confirmDelete(_id) {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined className='red' />,
      content: 'Are you sure you want to delete this employee?',
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: {danger : true, onClick : async () => { 
        const result = await Employee.deleteEmployee({ _id });
        if(result.success) this.getEmployees();
        else Modal.error({content : result.msg});  
      }},
    });
  }

  onEdit(id) {
    this.props.router.navigate(`../employee/add/${id}`, { replace: true })
  }

  async getEmployees() {
    const result = await Employee.getEmployeeList({
      page : this.state.page - 1,
      limit : this.state.pageSize,
      name : this.state.searchString ? this.state.searchString : undefined
    });
    if(result.success) {
      this.setState({totalEmployees : result.data.count, data : result.data.employees})
      console.log('done');
    }
  }

  render() {
    return (
      <div className='employee-list'>
        <div className="employee-list-header">
          <Search style={{width : '200px'}} placeholder="input search text"  onSearch= {(value) => {this.setState(() => { return {searchString : value}}, () => this.getEmployees()) }}/>
          <Pagination simple pageSize={this.state.pageSize} defaultCurrent={this.state.page} total={this.state.totalEmployees} onChange={async (page, pageSize) => { this.setState(() => {return { page }}, () => this.getEmployees()) }}/>
        </div>
        <div className="employee-list-body">
        <List
          itemLayout="horizontal"
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item
              actions={[<Button key="list-loadmore-edit" type='primary' onClick={() => this.onEdit(item._id)}>Edit</Button>, <Button key="list-loadmore-more" danger type='primary' onClick={() => this.confirmDelete(item._id)}>Delete</Button>]}
            >
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={<><span style={{color:'black'}}>Email : </span>{item.email}, <span style={{color:'black'}}>Phone : </span>{item.phone}, <span style={{color:'black'}}>Designation : </span>{item.designation}</>} 
              />
            </List.Item>
          )}
        />
        </div>
      </div>
    );
  }

}

export default withRouter(EmployeeList);
