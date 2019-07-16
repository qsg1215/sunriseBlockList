/* eslint no-useless-escape:0 import/prefer-default-export:0 */
import { Form } from 'antd';
import moment from 'moment';
import echarts from 'echarts';
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => reg.test(path);

const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

// 处理无限极json
/*   数组数据用下标代替
eg :
data:
 {
   tags: ['nice', 'developer'],
   child: {
       sub: 1
   },
    tags: [{name: 'chen'}, 'developer'],
  }
  {
      title: '所属区域',
      key: 'child.sub'
  },
  {
      title: '所属景区',
      key: 'tags.1'
  },
   {
      title: '所属景区',
      key: 'tags.1.name'
  },
*/
function dealFile(prop, row) {
  const propArr = prop.split('.');
  let result = row;
  for (let i = 0; i < propArr.length; i++) {
    if (result[propArr[i]] || result[propArr[i]] === 0) {
      result = result[propArr[i]];
    } else {
      result = '-';
      break;
    }
  }
  return result;
}

// 生成表格渲染列
export const generateColumns = columnsConfig => {
  const columns = [];
  columnsConfig.map(item => {
    const { key, align = 'center' } = item;
    columns.push({
      // dataIndex: key,
      key,
      align,
      render: row => <div>{dealFile(key, row)}</div>,
      ...item,
    });
    return item;
  });
  return columns;
};

// 统一的try catch 处理函数

export const dealWithCatchError = err => {
  console.log(err);
};

// 统一的数据回显

export const commonMapFiles = item => {
  const targetItem = {};
  for (const key in item) {
    targetItem[key] = Form.createFormField({
      value: item[key],
    });
  }

  return targetItem;
};

//同一的趋势图配置
export const echartLineStyleConfig = (bgColorArr) => {
  return {
    lineStyle: {
      color: bgColorArr[1] //改变折线颜色
    },
    color: bgColorArr[1],
    symbol: "emptyCircle",
    symbolSize: 8,
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              //折线图颜色渐变
              offset: 0,
              color: bgColorArr[1]

            },
            {
              offset: 1,
              color: bgColorArr[0]//把底部颜色
            }
          ]
        )
      }
    }
  }
}

//统一的图标渲染为空的展示
export const renderEmptyEcharts = (echartInstance, message = '暂无数据') => {
  echartInstance.clear();
  let canvas = echartInstance.getDom().getElementsByTagName('canvas')[0]
  if (canvas.getContext) {
    let ctx = canvas.getContext('2d');
    ctx.font = "14px Times New Roman";
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillText(message, echartInstance.getWidth() / 2, echartInstance.getHeight() / 2);
  }
}

export { isAntDesignProOrDev, isAntDesignPro, isUrl };
