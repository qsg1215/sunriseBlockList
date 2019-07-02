import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  Pagination,
  Modal,
  Row,
  Col,
  Divider,
  Popconfirm,
} from 'antd';
import { generateColumns } from '@/utils/utils';
import { connect } from 'dva';
import ParkingLotInfoModal from './components/ParkingLotInfoModal';
import { pageSizeOptions } from '@/utils/commonSetting';

const { Option } = Select;

@Form.create()
@connect(({ global, ParkingLotInfoModel, loading }) => ({
  global,
  ParkingLotInfoModel,
  currentEditTabelItem: ParkingLotInfoModel.currentEditTabelItem,
  modalType: ParkingLotInfoModel.modalType,
  confirmLoading: loading.effects['ParkingLotInfoModel/confirmModal'],
  tabelLoading: loading.effects['ParkingLotInfoModel/getparkingLotInfoList'],
}))
class TabeleSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  // 打开弹窗
  newHandle = () => {
    this.props.dispatch({
      type: 'ParkingLotInfoModel/save',
      payload: {
        visible: true,
        modalType: 'new',
      },
    });
  };

  // 查询回调
  searchHandle = () => {
    const searchParams = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'ParkingLotInfoModel/searchParkingLotInfoList',
      payload: { searchParams },
    });
  };

  // 重置回调
  resetHandle = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'ParkingLotInfoModel/resetParkingLotInfoList',
    });
  };

  // 新建停车场或者编辑
  confirmModal = () => {
    this.parkingInfoModdal.validateFields((err, value) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'ParkingLotInfoModel/confirmModal',
        payload: value,
      });
    });
  };

  // 关闭弹窗
  closeModal = () => {
    this.props.modalType == 'new' && this.parkingInfoModdal.resetFields();
    this.props.dispatch({
      type: 'ParkingLotInfoModel/closeModal',
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { AREA = [], SCENICAREA = [] } = this.props.global;
    const {
      ParkingLotInfoModel: { visible, modalType },
      confirmLoading,
      tabelLoading,
    } = this.props;
    return (
      <div className="tabeleSearch">
        <Form layout="inline">
          <Form.Item label="停车场名称">
            {getFieldDecorator('name')(<Input placeholder="请输入停车场名称!" />)}
          </Form.Item>
          <Form.Item label="所属区域">
            {getFieldDecorator('region')(
              <Select allowClear placeholder="请选择所属区域!">
                {AREA.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="所属景区">
            {getFieldDecorator('scenicArea')(
              <Select allowClear placeholder="请选择所属景区!">
                {SCENICAREA.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          {/* tabel 在loading 的时候不能执行查询操作 */}

          <Form.Item>
            <Button
              type="primary"
              disabled={tabelLoading}
              className="serachButtonMargin"
              onClick={this.searchHandle}
            >
              {' '}
              查询
            </Button>
            <Button type="primary" disabled={tabelLoading} onClick={this.resetHandle}>
              重置
            </Button>
          </Form.Item>

          <div className="operationContainer">
            <Button type="primary" onClick={this.newHandle}>
              {' '}
              新增
            </Button>
          </div>
        </Form>
        {/* 新增弹窗 */}
        <Modal
          width="60%"
          visible={visible}
          title={`${modalType == 'new' ? '新增' : '编辑'}停车场`}
          onOk={this.confirmModal}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={this.closeModal}
        >
          <ParkingLotInfoModal
            ref={form => {
              if (form) {
                this.parkingInfoModdal = form.wrappedInstance;
              }
            }}
          ></ParkingLotInfoModal>
        </Modal>
      </div>
    );
  }
}
@connect(({ ParkingLotInfoModel, loading }) => ({
  tabelDataList: ParkingLotInfoModel.tabelDataList,
  total: ParkingLotInfoModel.total,
  current: ParkingLotInfoModel.current,
  pageSize: ParkingLotInfoModel.pageSize,
  tabelLoading: loading.effects['ParkingLotInfoModel/getparkingLotInfoList'],
}))
class ParkingLotInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  // /点击分页
  currentPageNumberChange = (current, pageSize) => {
    this.props.dispatch({
      type: 'ParkingLotInfoModel/paginationChange',
      payload: {
        current,
        pageSize,
      },
    });
  };

  // 点击分页大小
  onShowSizeChange = (current, pageSize) => {
    this.props.dispatch({
      type: 'ParkingLotInfoModel/paginationChange',
      payload: {
        current,
        pageSize,
      },
    });
  };

  // 删除当前行
  confirmDeleteHandle = id => {
    this.props.dispatch({
      type: 'ParkingLotInfoModel/deleteParkingLot',
      payload: {
        id,
      },
    });
  };

  // 编辑当前行
  editTabelItem = record => {
    this.props.dispatch({
      type: 'ParkingLotInfoModel/editParkingLot',
      payload: {
        visible: true,
        modalType: 'edit',
        currentEditTabelItem: record,
      },
    });
  };

  // 在组件挂在前生成表格的列表配置
  componentWillMount() {
    const columnsConfig = [
      {
        title: '停车场名称',
        key: 'name',
      },
      {
        title: '所属区域',
        key: 'region',
      },
      {
        title: '所属景区',
        key: 'scenicArea',
      },
      {
        title: '停车场类型',
        key: 'type',
      },
      {
        title: '车位总数',
        key: 'parkingSpaceNumber',
      },
      {
        title: '联系人',
        key: 'contactsName',
      },
      {
        title: '联系方式',
        key: 'contactsPhoneNumber',
      },
      {
        title: '地址',
        key: 'address',
      },
      {
        title: '数据来源',
        key: 'dataSource',
      },
      {
        title: '操作',
        key: 'operation',
        render: record => (
          <div>
            <a href="javascript:void(0);" onClick={this.editTabelItem.bind(this, record)}>
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm
              placement="topRight"
              title="你确定要删除当前停车场吗?"
              okText="确定"
              onConfirm={this.confirmDeleteHandle.bind(this, record.id)}
              cancelText="取消"
            >
              <a href="javascript:void(0);">删除</a>
            </Popconfirm>
          </div>
        ),
      },
    ];
    this.setState({
      columns: generateColumns(columnsConfig),
    });
  }

  // 初始化第一页数据
  componentDidMount() {
    // 拿列表数据 ,拿字典列表
    this.props.dispatch({
      type: 'ParkingLotInfoModel/getparkingLotInfoList',
    });
    this.props.dispatch({
      type: 'global/getCode',
      payload: {
        codeTypeList: ['AREA', 'SCENICAREA', 'PARKTYPE', 'DATARESOURCE'],
      },
    });
  }

  render() {
    const { columns } = this.state;
    const { tabelDataList, tabelLoading, total, pageSize, current } = this.props;
    return (
      <div>
        <TabeleSearch></TabeleSearch>
        <Table
          rowKey="id"
          loading={tabelLoading}
          bordered
          pagination={false}
          columns={columns}
          dataSource={tabelDataList}
        />
        <div className="paginationContainer">
          <Pagination
            pageSizeOptions={pageSizeOptions}
            // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            showTotal={total => `共 ${total}条数据`}
            showQuickJumper
            current={current}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            onShowSizeChange={this.onShowSizeChange}
            onChange={this.currentPageNumberChange}
          />
        </div>
      </div>
    );
  }
}

export default ParkingLotInfo;
