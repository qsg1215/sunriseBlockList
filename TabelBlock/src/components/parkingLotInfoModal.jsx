import React from 'react'
import { Form, Input, InputNumber, Row, Col, Select } from 'antd';
import { connect } from 'dva';
import { formItemLayout, columnLayout } from '@/utils/commonSetting';
import { commonMapFiles } from '@/utils/utils';
const { Option } = Select;

@connect(
  ({ global, ParkingLotInfoModel }) => ({
    global,
    currentEditTabelItem: ParkingLotInfoModel.currentEditTabelItem,
  }),
  null,
  null,
  { withRef: true },
)
@Form.create({
  mapPropsToFields(props) {
    return commonMapFiles(props.currentEditTabelItem);
  },
})
class ParkingLotInfoModal extends React.Component {
  render() {
    const { AREA = [], SCENICAREA = [], PARKTYPE = [], DATARESOURCE = [] } = this.props.global;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout}>
        <Row gutter={16}>
          <Col {...columnLayout}>
            <Form.Item label="名称">
              {getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入停车场名称!',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="请输入停车场名称!" />)}
            </Form.Item>
          </Col>
          <Col {...columnLayout}>
            <Form.Item label="车位总数">
              {getFieldDecorator('parkingSpaceNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入车位总数!',
                  },
                ],
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  min={1}
                  step={1}
                  placeholder="请输入车位总数!"
                />,
              )}
            </Form.Item>
          </Col>
          <Col {...columnLayout}>
            <Form.Item label="类型">
              {getFieldDecorator('typeCode', {
                rules: [
                  {
                    required: true,
                    message: '请选择停车场类型!',
                  },
                ],
              })(
                <Select placeholder="请选择停车场类型!">
                  {PARKTYPE.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col {...columnLayout}>
            <Form.Item label="地址">
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: '请输入地址!',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="请输入地址!" />)}
            </Form.Item>
          </Col>

          <Col {...columnLayout}>
            <Form.Item label="经度" className="geoNumber">
              {getFieldDecorator('longitude', {
                rules: [
                  {
                    required: true,
                    message: '请输入经度!',
                  },
                ],
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={180}
                  placeholder="请输入经度!"
                />,
              )}
            </Form.Item>
          </Col>
          <Col {...columnLayout}>
            <Form.Item label="纬度" className="geoNumber">
              {getFieldDecorator('latitude', {
                rules: [
                  {
                    required: true,
                    message: '请输入纬度!',
                  },
                ],
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={90}
                  placeholder="请输入纬度!"
                />,
              )}
            </Form.Item>
          </Col>
          <Col {...columnLayout}>
            <Form.Item label="所属区域">
              {getFieldDecorator('regionCode', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属区域!',
                  },
                ],
              })(
                <Select placeholder="请选择所属区域!">
                  {AREA.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>

          <Col {...columnLayout}>
            <Form.Item label="所属景区">
              {getFieldDecorator('scenicAreaCode', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属景区!',
                  },
                ],
              })(
                <Select>
                  {SCENICAREA.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col {...columnLayout}>
            <Form.Item label="联系人">
              {getFieldDecorator('contactsName', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系人!',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="请输入联系人!" />)}
            </Form.Item>
          </Col>

          <Col {...columnLayout}>
            <Form.Item label="联系方式">
              {getFieldDecorator('contactsPhoneNumber', {
                rules: [
                  {
                    required: true,
                    message: '请输入联系方式!',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="请输入联系方式!" />)}
            </Form.Item>
          </Col>

          <Col {...columnLayout}>
            <Form.Item label="数据来源">
              {getFieldDecorator('dataSourceCode', {
                rules: [
                  {
                    required: true,
                    message: '请选择数据来源!',
                  },
                ],
              })(
                <Select placeholder="请选择数据来源!">
                  {DATARESOURCE.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ParkingLotInfoModal;
