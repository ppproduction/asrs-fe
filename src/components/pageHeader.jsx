import { Component } from 'react';
import { Button, PageHeader as Header } from 'antd';
import { withRouter } from '../utils/with-router';

class PageHeader extends Component {

    constructor() {
        super();
        this.state = {
            showAddEmployee: true
        }
    }


    componentDidMount() {
        if(this.props.router.location.pathname.search('/employee/add')>-1) {
            this.setState({showAddEmployee : false});
        } else {
            this.setState({showAddEmployee : true})
        }
    }
    
    componentDidUpdate(prevProps) {
        console.log(this.props.router.location.pathname.search('/employee/add'))
        if (this.props.router.location !== prevProps.router.location) {
            if(this.props.router.location.pathname.search('/employee/add')>-1) {
                this.setState({showAddEmployee : false});
            } else {
                this.setState({showAddEmployee : true})
            }
        }
    }

    render() {
        return (
            <>
                <div className="">
                    <Header
                        className='site-page-header'
                        title="Employees CRUD operations"
                        extra={[
                            (this.state.showAddEmployee && <Button key="add-employee-button" type='primary' onClick={() => this.props.router.navigate('../employee/add', { replace: true })}> + Add Employee</Button>),
                            (!this.state.showAddEmployee && <Button key="add-employee-button" type='primary' onClick={() => this.props.router.navigate('../', { replace: true })}> Home</Button>)
                        ]}
                    ></Header>
                </div>
            </>
        );
    }
}

export default withRouter(PageHeader);
