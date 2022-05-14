import { Form } from "antd";

export const withForm = (Component) => {
    function ComponentWithFormProp(props) {
        let useForm = Form.useForm();
        return (
            <Component
                {...props}
                form={{ useForm }}
            />
        );
    }
    return ComponentWithFormProp;
}