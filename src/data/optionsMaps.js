const optionsMap = {
  categorys: [
    {
      label: '国内新闻',
      value: '220634',
    },
    {
      label: '国际新闻',
      value: '220635',
    },
    {
      label: '财经',
      value: '220636',
    },
    {
      label: '体育',
      value: '220637',
    },
    {
      label: '娱乐',
      value: '220638',
    },
    {
      label: '肖像',
      value: '220641',
    },
    {
      label: '历史',
      value: '220654',
    },
    {
      label: '时尚',
      value: '220671',
    },
    {
      label: '故事',
      value: '220677',
    },
    {
      label: '生活',
      value: '220720',
    },
    {
      label: '旅游(非时效)',
      value: '223291',
    },
  ],
  timelines: [
    {
      value: '1',
      label: '时效',
    },
    {
      value: '2',
      label: '资料',
    },
  ],
  topicState: [
    {
      value: '0',
      label: '未发布',
    },
    {
      value: '1',
      label: '已发布',
    },
    {
      value: '2',
      label: '已下线',
    },
    {
      value: '3',
      label: '已删除',
    },
  ],
  runningStatus: [
    {
      value: '0',
      label: '未抓取',
    },
    {
      value: '1',
      label: '抓取中',
    },
    {
      value: '2',
      label: '抓取结束',
    },
  ],
  ranges: [
    {
      value: '1',
      label: '图关键词',
    },
    {
      value: '2',
      label: '组关键词',
    },
    {
      value: '3',
      label: '图说',
    },
    {
      value: '4',
      label: '组说',
    },
  ],
  assets: [
    {
      value: '1',
      label: '时效',
    },
    {
      value: '2',
      label: '资料',
    },
  ],
  imageStatus: [
    {
      value: '1',
      label: '已上线/审核',
    },
    {
      value: '2',
      label: '已上线/自动',
    },
    {
      value: '3',
      label: '未上线/未编审',
    },
  ],
};

function getOptions(optionsName) {
  return optionsMap[optionsName] || [];
}

function getOptionName(options, value) {
  const names = (typeof options === 'string' ? optionsMap[options] : options).reduce((result, option) => {
    if (option.value === value) {
      result.push(option.label);
    }
    return result;
  }, []);

  if (names.length > 0) {
    return names.join(',');
  } else {
    return '---';
  }
}

export { getOptions, getOptionName };
