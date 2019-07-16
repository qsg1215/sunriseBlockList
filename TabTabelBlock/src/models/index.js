import {
    getTabelDataListApi,
    deleteApi,
    newApi,
    editApi,
    detailApi
} from '../service/TabelBlock'
import { dealWithCatchError } from '../utils/utils';
import { pageSizeOptions } from '../utils/commonSetting';

let selectOptions1 = [{
    id: '0',
    name: '洪川镇',
},
{
    id: '1',
    name: '止戈镇',
},
{
    id: '2',
    name: '将军乡',
},
{
    id: '3',
    name: '将军乡1',
},
{
    id: '4',
    name: '将军乡2',
},
{
    id: '5',
    name: '将军乡3',
}]

// 表单数据初始化对象
const initEditItem = {
    name: '',
    type: '',
    value: '',
    number: '',
};

let tabsConfig = [{
    key: 'area',
    label: '景区'
},
{
    key: 'park',
    label: '停车场'
}, {
    key: 'other',
    label: '其他'
}

]

const PAGE_NAME_UPPER_CAMEL_CASEModel = {
    namespace: 'PAGE_NAME_UPPER_CAMEL_CASEModel',
    state: {
        visible: false,
        tabelDataList: [],
        total: 0,
        current: 1,
        pageSize: Number(pageSizeOptions[0]),
        condition: {
            file1: '',
            file2: '',
        },
        selectOptions1,
        modalType: 'new',
        currentEditItem: initEditItem,
        PAGE_NAME_UPPER_CAMEL_CASEDetailModalVisible: false,
        tabsConfig,
        defaultActiveKey: tabsConfig[0].key,
        activeKey: tabsConfig[0].key
    },
    effects: {
        // 获取表格列表
        *getTableDataList({ payload }, { call, put, select }) {
            try {
                const {
                    pageSize,
                    current,
                    condition,
                } = yield select(state => state.PAGE_NAME_UPPER_CAMEL_CASEModel);
                const params = {
                    pageSize,
                    current,
                    condition
                };
                const response = yield call(getTabelDataListApi, params);
                if (!response) return;
                yield put({
                    type: 'save',
                    payload: {
                        tabelDataList: response.data.datalist,
                        total: response.data.total,
                    },
                });
            } catch (err) {
                dealWithCatchError(err);
            }
        },

        // 确认弹窗按钮, 可以是新增, 也可以是编辑
        *confirmModal({ payload }, { call, put, select }) {
            try {

                const { modalType, currentEditItem } = yield select(
                    state => state.PAGE_NAME_UPPER_CAMEL_CASEModel,
                );
                const params = {
                    ...payload,
                };
                if (modalType == 'edit') {
                    params.id = currentEditItem.id;
                }
                const response = yield call(
                    modalType == 'new' ? newApi : editApi,
                    params
                );
                if (!response) return;
                yield put({
                    type: 'save',
                    payload: {
                        visible: false,
                        currentEditItem: initEditItem,
                    },
                });
                // 如果当前是在最后一页, 或者第一页(根据返回的排序确定刷新首页还是尾页数据, 乱序则全部刷新, 不论当前在那一页, 暂时全部刷新, 根据业务需要来)
                yield put({
                    type: 'getTableDataList',
                });
                return true
            } catch (err) {
                dealWithCatchError(err);
            }
        },

        // 编辑
        *edit({ payload }, { call, put, select }) {
            try {
                yield put({
                    type: 'save',
                    payload: {
                        ...payload,
                    },
                });
            } catch (error) {
                dealWithCatchError(error);
            }
        },

        // 详情
        *detail({ payload }, { call, put }) {
            try {
                const response = yield call(detailApi, payload.currentEditItem.id);
                if (!response) return;
                yield put({
                    type: 'save',
                    payload: {
                        ...payload,
                        currentEditItem: response.data
                    },
                });


            } catch (err) {
                dealWithCatchError(err);
            }
        },

        // 删除停车场
        *delete({ payload }, { call, select, put }) {
            try {
                const {
                    pageSize,
                    current,
                    condition,
                    tabelDataList
                } = yield select(state => state.PAGE_NAME_UPPER_CAMEL_CASEModel);
                const params = {
                    pageSize,
                    current,
                    condition
                };

                const response = yield call(deleteApi, params);
                if (!response) return;
                // 判断是不是最后一页, 是最后一页还要判断是不是最后一条数据, 在决定如何刷新列表数据
                if (current > 1 && tabelDataList.length == 1) {
                    yield put({
                        type: 'save',
                        payload: {
                            current: current - 1,
                        },
                    });
                }
                yield put({
                    type: 'getTableDataList',
                });
            } catch (err) {
                dealWithCatchError(err);
            }
        },

        // 分页改变(当前页或者页码大小)
        *paginationChange({ payload }, { call, put }) {
            try {
                yield put({
                    type: 'save',
                    payload: {
                        ...payload,
                    },
                });
                yield put({
                    type: 'getTableDataList',
                });
            } catch (err) {
                dealWithCatchError(err);
            }
        },

        // 查询数据
        *search({ payload }, { call, put }) {
            try {
                yield put({
                    type: 'save',
                    payload: {
                        ...payload,
                        current: 1,
                    },
                });
                yield put({
                    type: 'getTableDataList',
                });
            } catch (err) {
                dealWithCatchError(err);
            }
        },

        // 重置数据
        *reset({ payload }, { call, put }) {
            try {
                yield put({
                    type: 'search',
                    payload: {
                        ...payload,
                    },
                });
                yield put({
                    type: 'getTableDataList',
                });
            } catch (err) {
                dealWithCatchError(err);
            }
        },
        // 关闭弹窗
        *closeModal({ }, { put }) {
            try {
                yield put({
                    type: 'save',
                    payload: {
                        visible: false,
                        currentEditItem: initEditItem,
                    },
                });
            } catch (err) {
                dealWithCatchError(err);
            }
        },
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
export default PAGE_NAME_UPPER_CAMEL_CASEModel;
