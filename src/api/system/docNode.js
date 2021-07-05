import request from '@/utils/request'

//查询文件夹列表
var gszkApi = 'https://451449a3-682b-4aa5-aae0-cd315758048d.mock.pstmn.io';
export function treeselect(query) {
    return request({
        url: gszkApi + '/ia_admin/doc_mgr/get_tree_data',
        method: 'post',
        params: query
    })
}