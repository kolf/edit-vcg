const filters = [
  {
    id: '1',
    label: '频道',
    field: 'cid',
    formType: 'radio',
    options: [
      {
        label: '国内新闻',
        value: '220634'
      },
      {
        label: '国际新闻',
        value: '220635'
      },
      {
        label: '财经',
        value: '220636'
      },
      {
        label: '体育',
        value: '220637'
      },
      {
        label: '娱乐',
        value: '220638'
      },
      {
        label: '肖像',
        value: '220641'
      },
      {
        label: '历史',
        value: '220654'
      },
      {
        label: '时尚',
        value: '220671'
      },
      {
        label: '故事',
        value: '220677'
      },
      {
        label: '生活',
        value: '220720'
      },
      {
        label: '旅游(非时效)',
        value: '223291'
      }
    ]
  },
  {
    id: '2',
    label: '专题状态',
    field: 'status',
    formType: 'radio',
    options: [
      {
        label: '未发布',
        value: '0'
      },
      {
        label: '已发布',
        value: '1'
      },
      {
        label: '已下线',
        value: '2'
      }
    ]
  },
  {
    id: '3',
    label: '创建时间',
    field: 'createdTime',
    formType: 'radioTime',
    options: [
      {
        label: '今天',
        value: '1'
      },
      {
        label: '昨天',
        value: '2'
      },
      {
        label: '近一周',
        value: '3'
      }
    ]
  },
  {
    id: '4',
    label: '发布时间',
    field: 'publishTime',
    formType: 'radioTime',
    options: [
      {
        label: '今天',
        value: '1'
      },
      {
        label: '昨天',
        value: '2'
      },
      {
        label: '近一周',
        value: '3'
      }
    ]
  },
  {
    id: '5',
    label: '编审人',
    field: 'updatedBy',
    placeholder: '请输入供稿人',
    fieldType: 'searchInput'
  },
  {
    id: '6',
    label: '抓取状态',
    field: 'runningStatus',
    formType: 'radio',
    options: [
      {
        label: '未抓取',
        value: '0'
      },
      {
        label: '抓取中',
        value: '1'
      },
      {
        label: '抓取结束',
        value: '2'
      }
    ]
  }
]

export default {
  list (...arg) {
    return Array.from([...arg]).map(id => filters.find(item => item.id == id))
  }
}
