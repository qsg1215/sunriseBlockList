import React from 'react'
import { Form, Input, InputNumber, Select } from 'antd';
import { connect } from 'dva';
import { formItemLayout } from '../utils/commonSetting';
import { commonMapFiles } from '../utils/utils';
const { Option } = Select;

@connect(
  ({ PAGE_NAME_UPPER_CAMEL_CASEModel }) => ({
    ...PAGE_NAME_UPPER_CAMEL_CASEModel
  }))
@Form.create({
  mapPropsToFields(props) {
    return commonMapFiles(props.currentEditItem);
  },
})
class PAGE_NAME_UPPER_CAMEL_CASEModal extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    let { selectOptions1 } = this.props;
    return (
      <Form {...formItemLayout}>
        <Form.Item label="文字">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入文字!',
                whitespace: true,
              },
            ],
          })(<Input placeholder="请输入文字!" />)}
        </Form.Item>
        <Form.Item label="数字" >
          {getFieldDecorator('number', {
            rules: [
              {
                required: true,
                message: '请输入数字!',
              },
            ],
          })(
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={180}
              placeholder="请输入数字!"
            />
          )}
        </Form.Item>
        <Form.Item label="枚举值">
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '请选择枚举值!',
              },
            ],
          })(
            <Select placeholder="请选择枚举值!">
              {selectOptions1.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>,
          )}
        </Form.Item>

      </Form>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASEModal;
