import * as types from '../mutation_types'
import Vue from 'vue'
export const setContent = ({ dispatch, state }, tag) => {
  if (state[tag]) return false
  Vue.http({
    url: '/api/v1/topics',
    method: 'GET',
    params: {
      page: 0,
      limit: 20,
      tab: tag === 'index' ? '' : tag
    }
  }).then(function (res) {
    let data = JSON.parse(res.data)
    if (data.success) {
      dispatch(types.SET_CONTENT, tag, data.data)
    } else {
      return data.error_msg
    }
  }, function (err) {
    console.log(err)
    return '接口调用出错'
  })
}
