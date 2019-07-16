import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  Pagination,
  Modal,
  Divider,
  Popconfirm,
  Tabs
} from 'antd';
import { generateColumns } from './utils/utils';
import { connect } from 'dva';
import PAGE_NAME_UPPER_CAMEL_CASEModal from './components/ComModal';
import PAGE_NAME_UPPER_CAMEL_CASEDetailModal from './components/DetailModal';
import { pageSizeOptions } from './utils/commonSetting';
import { commonMapFiles } from './utils/utils';

const { Option } = Select;
const { TabPane } = Tabs;


@connect(({ PAGE_NAME_UPPER_CAMEL_CASEModel, loading }) => ({
  ...PAGE_NAME_UPPER_CAMEL_CASEModel,
  confirmLoading: loading.effects['PAGE_NAME_UPPER_CAMEL_CASEModel/confirmModal'],
  tabelLoading: loading.effects['PAGE_NAME_UPPER_CAMEL_CASEModel/getTableDataList'],
}))
@Form.create({
  mapPropsToFields(props) {
    return commonMapFiles(props.condition);
  }
})
class TabeleSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  // 打开弹窗
  newHandle = () => {
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/save',
      payload: {
        visible: true,
        modalType: 'new',
      },
    });
  };

  // 查询回调
  searchHandle = () => {
    const condition = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/search',
      payload: { condition },
    });
  };

  // 重置回调
  resetHandle = () => {
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/reset',
      payload: {
        condition: {
          file1: '',
          file2: ''
        }
      },
    });
  };

  // 弹窗的确认
  confirmModal = () => {
    this.PAGE_NAME_UPPER_CAMEL_CASEModal.props.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/confirmModal',
        payload: value,
      }).then(res => {
        res && this.PAGE_NAME_UPPER_CAMEL_CASEModal.props.form.resetFields()
      });
    });
  };

  // 关闭弹窗
  closeModal = () => {
    //this.props.modalType == 'new' && this.parkingInfoModdal.resetFields();
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/closeModal',
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      visible,
      modalType,
      confirmLoading,
      tabelLoading,
      selectOptions1
    } = this.props;
    return (
      <div>
        <Form>
          <Form.Item label="搜索条件1">
            {getFieldDecorator('file1')(<Input placeholder="请输入停车场名称!" />)}
          </Form.Item>
          <Form.Item label="搜索条件2">
            {getFieldDecorator('file2')(
              <Select allowClear placeholder="请选择所属区域!">
                {selectOptions1.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              disabled={tabelLoading}
              className="serachButtonMargin"
              onClick={this.searchHandle}
            >
              查询
            </Button>

            <Button disabled={tabelLoading} onClick={this.resetHandle}>
              重置
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={this.newHandle}>
          新增
        </Button>

        {/* 弹窗 */}
        <Modal
          width="60%"
          visible={visible}
          title={`${modalType == 'new' ? '新增' : '编辑'}`}
          onOk={this.confirmModal}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={this.closeModal}
        >
          <PAGE_NAME_UPPER_CAMEL_CASEModal wrappedComponentRef={PAGE_NAME_UPPER_CAMEL_CASEModal => this.PAGE_NAME_UPPER_CAMEL_CASEModal = PAGE_NAME_UPPER_CAMEL_CASEModal}   ></PAGE_NAME_UPPER_CAMEL_CASEModal>
        </Modal>
      </div>
    );
  }
}
@connect(({ PAGE_NAME_UPPER_CAMEL_CASEModel, loading }) => ({
  ...PAGE_NAME_UPPER_CAMEL_CASEModel,
  tabelLoading: loading.effects['PAGE_NAME_UPPER_CAMEL_CASEModel/getTableDataList'],
}))
class PAGE_NAME_UPPER_CAMEL_CASE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
  }

  // /点击分页
  currentPageNumberChange = (current, pageSize) => {
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/paginationChange',
      payload: {
        current,
        pageSize,
      },
    });
  };

  // 点击分页大小
  onShowSizeChange = (current, pageSize) => {
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/paginationChange',
      payload: {
        current,
        pageSize,
      },
    });
  };

  // 删除当前行
  confirmDeleteHandle = id => {
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/delete',
      payload: {
        id,
      },
    });
  };

  // 编辑当前行
  editCurrentItem = record => {
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/edit',
      payload: {
        visible: true,
        modalType: 'edit',
        currentEditItem: record,
      },
    });
  };

  //详情展示
  showDetail = record => {
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/detail',
      payload: {
        PAGE_NAME_UPPER_CAMEL_CASEDetailModalVisible: true,
        currentEditItem: record,
      },
    });
  };



  // 在组件挂在前生成表格的列表配置
  componentWillMount() {
    const columnsConfig = [

      {
        title: 'ID',
        key: 'id',
      },

      {
        title: '文字',
        key: 'name',
      },
      {
        title: '枚举',
        key: 'type',
      },
      {
        title: '数值',
        key: 'number',
      },
      {
        title: '操作',
        key: 'operation',
        render: record => (
          <div>
            <a href="javascript:void(0);" onClick={this.editCurrentItem.bind(this, record)}>
              编辑
            </a>

            <Divider type="vertical" />

            <Popconfirm
              placement="topRight"
              title="你确定要删除当前行吗?"
              okText="确定"
              onConfirm={this.confirmDeleteHandle.bind(this, record.id)}
              cancelText="取消"
            >
              <a href="javascript:void(0);">删除</a>
            </Popconfirm>

            <Divider type="vertical" />

            <a href="javascript:void(0);" onClick={this.showDetail.bind(this, record)}>
              详情
            </a>

          </div>
        ),
      },
    ];
    this.setState({
      columns: generateColumns(columnsConfig),
    });
  }

  // 初始化数据
  componentDidMount() {
    // 拿列表数据 
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/getTableDataList',
    });
  }

  //tabChange
  tabChangehandle = (activeKey) => {
    this.props.dispatch({
      type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/save',
      payload: {
        activeKey
      }
    });
  }

  render() {
    const { columns } = this.state;
    const { tabelDataList, tabelLoading, total, pageSize, current, tabsConfig, defaultActiveKey, activeKey } = this.props;
    return (
      <div>
        <Tabs activeKey={activeKey} defaultActiveKey={defaultActiveKey} onChange={this.tabChangehandle}>
          {
            tabsConfig.map(item =>
              <TabPane tab={item.label} key={item.key}>
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
                <PAGE_NAME_UPPER_CAMEL_CASEDetailModal></PAGE_NAME_UPPER_CAMEL_CASEDetailModal>
              </TabPane>)
          }


        </Tabs>

      </div>
    );
  }
}

export default PAGE_NAME_UPPER_CAMEL_CASE;
