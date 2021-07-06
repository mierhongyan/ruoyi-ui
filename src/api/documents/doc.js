import request from '@/utils/request'
var gszkApi = 'https://451449a3-682b-4aa5-aae0-cd315758048d.mock.pstmn.io';
// 查询用户列表
export function listDoc(query) {
    return request({
      url: gszkApi + '/ia_admin/doc_mgr/load_sub_node_list_datatable_json',
      method: 'post',
      params: query
    })
  }