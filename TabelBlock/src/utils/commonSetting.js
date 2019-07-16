// 弹窗表单的栅格布局
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 4 },
    xl: { span: 6 },
    xxl: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 18 },
    lg: { span: 20 },
    xl: { span: 18 },
    xxl: { span: 18 },
  },
};

//垂直平铺layout
export const singleFormItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  },
};


// 栅格布局
export const columnLayout = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 12,
  xxl: 12,
};

// 分页的每页显示条数
export const pageSizeOptions = ['10', '20', '30', '40'];


//饱和度配置
export const saturationConfig = [
  {
    id: '1',
    name: '充足',
    code: '000',
    color: 'rgb(79,210,125)',
    opacity_color: 'rgba(79,210,125,0.2)',
  },
  {
    id: '2',
    name: '饱和',
    code: '001',
    color: 'rgb(255,208,69)',
    opacity_color: 'rgba(255,208,69, 0.2)',
  },
  {
    id: '3',
    name: '紧缺',
    code: '002',
    color: 'rgb(232, 14, 14)',
    opacity_color: 'rgba(232, 14, 14, 0.2)',
  },
  {
    id: '4',
    name: '无余位',
    code: '003',
    color: 'rgb(180, 0, 0)',
    opacity_color: 'rgba(180, 0, 0, 0.2)',
  },
];

//echart 图标基础配置
export const baseEchartsOptionConfig = {
  noDataLoadingOption: {
    text: '暂无数据',
    effect: 'bubble',
    effectOption: {
      effect: {
        n: 0
      }
    }
  },
  grid: {
    top: '40px',
    bottom: 0,
    right: '30px',
    left: '30px',
    containLabel: true
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },

  xAxis: [
    {
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        textStyle: {
          color: "rgba(85, 85, 85, 1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#BBBBBB"
        }
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        textStyle: {
          color: "rgba(85, 85, 85, 1)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#BBBBBB"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(238,238,238,1)"
        }
      }
    }
  ],

}

//echart统计图颜色配置
export const baseEchartsColor = {

  //统计渐变色
  calc_them1: ['rgba(73, 215, 255, 1)', 'rgba(26, 152, 241, 1)'],
  calc_them2: ['rgba(89, 151, 255, 1)', 'rgba(23, 69, 255, 1)'],
  calc_them3: ['rgba(202, 119, 254, 1)', 'rgba(116, 51, 255, 1)'],
  //calc_them4: ['rgba(255, 87, 217, 1)', 'rgba(254, 0, 142, 1)'],
  calc_them4: ['rgba(0, 190, 138, 0)', 'rgba(0, 190, 138, 1)'],
  calc_them5: ['rgba(9, 225, 124, 1)', 'rgba(0, 190, 138, 1)'],

  //饱和度统计完成进度统计图
  // pie_them1: ["#2BAFFC", "rgba(43,175,252,0.1)"],
  pie_them2: ["rgba(165, 220, 252, 1)", "rgba(31, 168, 248, 1)"],

}


