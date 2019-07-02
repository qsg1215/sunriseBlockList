import {
  getParkingLotInfoListApi,
  newParkingLotApi,
  editParkingLotApi,
  deleteParkingLotApi,
} from '@/services/resourceMag/parkingLotInfo';
import { dealWithCatchError } from '@/utils/utils';
import { pageSizeOptions } from '@/utils/commonSetting';

// 表单数据初始化

const initTabelItem = {
  name: '',
  parkingSpaceNumber: '',
  typeCode: '',
  address: '',
  longitude: '',
  latitude: '',
  regionCode: '',
  scenicAreaCode: '',
  contactsName: '',
  contactsPhoneNumber: '',
  dataSourceCode: '',
};

const ParkingLotInfoModel = {
  namespace: 'ParkingLotInfoModel',
  state: {
    visible: false,
    tabelDataList: [],
    total: 0,
    current: 1,
    pageSize: Number(pageSizeOptions[0]),
    searchParams: {
      name: '',
      region: '',
      scenicArea: '',
    },
    modalType: 'new',
    currentEditTabelItem: initTabelItem,
  },
  effects: {
    // 获取停车场列表
    *getparkingLotInfoList({ payload }, { call, put, select }) {
      try {
        const {
          pageSize,
          current: pageNum,
          searchParams: { name = '', region: regionCode, scenicArea: scenicAreaCode },
        } = yield select(state => state.ParkingLotInfoModel);
        const params = {
          pageSize,
          pageNum,
          orderItemList: [
            {
              column: 'gmt_create',
              asc: true,
            },
          ],
          condition: {
            name: name.trim(),
            regionCode,
            scenicAreaCode,
          },
        };
        const response = yield call(getParkingLotInfoListApi, params);
        if (!response) return;
        yield put({
          type: 'save',
          payload: {
            tabelDataList: response.data.list,
            total: response.data.totalCount,
          },
        });
      } catch (err) {
        dealWithCatchError(err);
      }
    },

    // 确认弹窗按钮, 可以是新增, 也可以是编辑
    *confirmModal({ payload }, { call, put, select }) {
      try {
        const { AREA, SCENICAREA, PARKTYPE, DATARESOURCE } = yield select(state => state.global);
        const { modalType, currentEditTabelItem } = yield select(
          state => state.ParkingLotInfoModel,
        );
        const params = {
          ...payload,
          // 处理枚举值, 后期会去掉
          region: AREA[payload.regionCode].name,
          type: PARKTYPE[payload.typeCode].name,
          scenicArea: SCENICAREA[payload.scenicAreaCode].name,
          dataSource: DATARESOURCE[payload.dataSourceCode].name,
        };
        if (modalType == 'edit') {
          params.id = currentEditTabelItem.id;
        }
        const response = yield call(
          modalType == 'new' ? newParkingLotApi : editParkingLotApi,
          params,
          {
            show: true,
          },
        );
        if (!response) return;
        yield put({
          type: 'save',
          payload: {
            visible: false,
            currentEditTabelItem: initTabelItem,
          },
        });
        // 如果当前是在最后一页, 或者第一页(根据返回的排序确定刷新首页还是尾页数据, 乱序则全部刷新, 不论当前在那一页, 暂时全部刷新, 根据业务需要来)
        yield put({
          type: 'getparkingLotInfoList',
        });
      } catch (err) {
        dealWithCatchError(err);
      }
    },

    // 编辑停车场
    *editParkingLot({ payload }, { call, put, select }) {
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
    *getParkingLotInfoDetail({ payload }, { call, put }) {
      try {
        const response = yield call(newParkingLotApi(payload));

        if (!response) return;
        yield put({
          type: 'save',
          payload: {
            tabelDataList: response.data.dataList,
          },
        });
      } catch (err) {
        dealWithCatchError(err);
      }
    },

    // 删除停车场
    *deleteParkingLot({ payload }, { call, select, put }) {
      try {
        const response = yield call(deleteParkingLotApi, payload, {
          show: true,
        });
        if (!response) return;

        // 判断是不是最后一页, 是最后一页还要判断是不是最后一条数据, 在决定如何刷新列表数据
        const { current, tabelDataList } = yield select(state => state.ParkingLotInfoModel);

        if (current > 1 && tabelDataList.length == 1) {
          yield put({
            type: 'save',
            payload: {
              current: current - 1,
            },
          });
        }
        yield put({
          type: 'getparkingLotInfoList',
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
          type: 'getparkingLotInfoList',
        });
      } catch (err) {
        dealWithCatchError(err);
      }
    },

    // 查询数据
    *searchParkingLotInfoList({ payload }, { call, put }) {
      try {
        yield put({
          type: 'save',
          payload: {
            ...payload,
            current: 1,
          },
        });
        yield put({
          type: 'getparkingLotInfoList',
        });
      } catch (err) {
        dealWithCatchError(err);
      }
    },

    // 重置数据
    *resetParkingLotInfoList({ payload }, { call, put }) {
      try {
        yield put({
          type: 'save',
          payload: {
            searchParams: {
              name: '',
              region: '',
              scenicArea: '',
            },
            current: 1,
          },
        });
        yield put({
          type: 'getparkingLotInfoList',
        });
      } catch (err) {
        dealWithCatchError(err);
      }
    },
    // 关闭弹窗
    *closeModal({}, { put }) {
      try {
        yield put({
          type: 'save',
          payload: {
            visible: false,
            currentEditTabelItem: initTabelItem,
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
export default ParkingLotInfoModel;
