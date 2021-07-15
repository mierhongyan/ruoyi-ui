import request from '@/utils/request'

//查询所有可以赋予本目录权限的人的信息。
var gszkApi = 'https://451449a3-682b-4aa5-aae0-cd315758048d.mock.pstmn.io';
export function NodeFolderPermissionList(query) {
    return request({
        url: gszkApi + '/ia_admin/doc_mgr/get_node_folder_permission_list',
        method: 'post',
        params: query
    })
}
/**
 * 
 * @param {type_id:文件类型} query 
 * @returns {code: "权限英文名称",id: "权限名称id",name: "具体权限名称"} permisson_dictionary
 */
export function getNodePermissionDictionary(query) {
    return request({
        url: gszkApi + '/ia_admin/doc_mgr/get_node_permission_dictionary',
        method: 'post',
        params: query
    })
}