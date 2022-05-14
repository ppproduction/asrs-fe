/* eslint-disable no-template-curly-in-string */
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { Component } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { withRouter } from '../utils/with-router';
import { Employee } from '../services/employee';
import { withForm } from '../utils/with-form';

class EditEmployee extends Component {

  constructor() {
    super();

    this.state = {
        editMode : false,
        name : null,
        email : null,
        designation : null,
        phone : null,
        _id : '',
    }
  }

  async componentDidMount() {
    const empId = this.props.router.params.empId;
    if(empId) {
        const result = await Employee.getEmployee({ _id : empId });
        if(result.success) {
            console.log(result);
            this.setState(() => { return result.data }, () => { console.log(this.state)});
            console.log(this.props.form.useForm[0]);
            this.props.form.useForm[0].setFieldsValue(this.state);
        }
        else {
            Modal.error({content : result.msg});
        }
        this.setState({editMode : true});
    }
  }

  validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} should be a valid email!',
      number: '${label} should be a number!',
    },
  };

  onSubmit = async (values) => {
    if(this.state.editMode) {
        console.log(this.state);
        const result = await Employee.updateEmployee({ ...this.state, ...values })
        if(result.success) this.props.router.navigate('../', { replace : true })
        else {
            Modal.error({content : result.msg});
        }
    }
    else {        
        const result = await Employee.createEmployee(values);
        if(result.success) this.props.router.navigate('../', { replace : true })
        else {
            Modal.error({content : result.msg});
        }
    }
  };

  render() {
    return (
      <div className='edit-employee'>
        <Form
            form={this.props.form.useForm[0]}
            style={{width: '70%'}}
            layout='vertical'
            validateMessages={this.validateMessages}
            initialValues={this.state}
            onFinish={this.onSubmit}
        >
            <Form.Item name={'name'} label="Employee Name" rules={[{ required:true }]} tooltip={{ title: 'Name of employee', icon: <InfoCircleOutlined /> }}>
                <Input placeholder='Enter name'></Input>
            </Form.Item>
            <Form.Item name={'email'} label="Employee Email" rules={[{ required:true, type:'email' }]} tooltip={{ title: 'Email of employee', icon: <InfoCircleOutlined /> }}>
                <Input placeholder='Enter email'></Input>
            </Form.Item>
            <Form.Item name={'phone'} label="Employee Phone" rules={[{required:true}]} tooltip={{ title: 'Phone number of employee', icon: <InfoCircleOutlined /> }}>
                <InputNumber  placeholder='Enter phone number' controls={false} style={{width : '100%'}}></InputNumber>
            </Form.Item>
            <Form.Item name={'designation'} label="Employee Designation" rules={[{required:true}]} tooltip={{ title: 'Designation of employee', icon: <InfoCircleOutlined /> }}>
                <Input placeholder='Enter designation' ></Input>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType='submit'>Submit</Button>
            </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(withForm(EditEmployee));
