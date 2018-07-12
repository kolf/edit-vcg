export function searchName(rule, value, callback) {
  if (value && value.length > 50) {
    callback('筛选项名称不能超过50个字符');
  }
  callback();
}

export function topicName(rule, value, callback) {
  if (value && value.length > 40) {
    callback('专题名称不能超过40个字符');
  }
  callback();
}

export function everyKeywordId(rule, value, callback) {
  if (
    !Object.values(value).every(v => {
      if (typeof v === 'string') {
        return /^\d+$/.test(v);
      } else {
        return /^\d+$/.test(v.value);
      }
    })
  ) {
    callback('请删除不确定关键词');
  }
  callback();
}
