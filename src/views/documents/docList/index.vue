<template>
  <div class="app-container">
    <el-row>
      <!-- 文件夹目录 -->
      <el-col :span="6" :xs="24">
        <!-- <div class="head-container">
          <el-input
            v-model="docName"
            placeholder="请输入文件或文件夹名称"
            size="small"
            clearable
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          ></el-input>
        </div> -->
        <div>【固收智库】目录列表</div>
        <div class="head-container">
          <el-tree
            ref="tree"
            :data="docOptions"
            :props="defaultProps"
          ></el-tree>
        </div>
      </el-col>

      <!-- 文件数据 -->
      <el-col :span="18" :xs="24">
        <!-- 忽略：el-form 搜索部分，暂时省略。 -->

        <!-- 文件的新增（创建报告）；批量删除 el-row/el-table/pagination-->
        <!-- todo:文件夹的新增(创建目录) -->
        <!-- 忽略：批量导入和导出 -->
        <div>当前路径</div>
        <el-row :gutter="10">
          <el-col :span="1.5" :offset="0.5">
            <el-button
              type="success"
              size="mini"
              icon="el-icon-plus"
              @click="handleAdd"
              >创建目录</el-button
            >
          </el-col>
          <el-col :span="1.5" :offset="0.5">
            <el-button type="warning" size="mini" icon="el-icon-edit" @click="creatDoc"
              >创建报告</el-button
            >
          </el-col>
          <el-col :span="1.5" :offset="16">
            <el-button type="danger" size="mini" icon="el-icon-setting"
              >当前目录属性</el-button
            >
          </el-col>
        </el-row>
        <!-- 文件列表 -->
        <!-- todo:将类型type_id对应成相应的字段，比如type_id = 1 是文件夹 -->
        <el-table v-loading="loading" :data="docList">
          <el-table-column label="名称" align="center" prop="name" />
          <el-table-column label="类型" align="center" prop="type_id" />
          <el-table-column label="创建人" align="center" prop="create_uname" />
          <el-table-column label="修改人" align="center" prop="update_uname" />
          <el-table-column
            label="修改时间"
            align="center"
            prop="update_datetime"
          />
          <el-table-column
            label="操作"
            align="center"
            width="180"
            class-name="small-padding fixed-width"
          >
            <template>
              <el-button type="text" size="mini" icon="el-icon-edit"
                >修改</el-button
              >
              <el-button type="text" size="mini" icon="el-icon-delete"
                >删除</el-button
              >
              <el-button type="text" size="mini" icon="el-icon-key"
                >重置</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页条 -->
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>
    <!-- todo:添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" close="">
      <el-tabs type="card" tab-position="top" v-model="activeName">
        <el-tab-pane label="常规" name="first">
          <el-form :model="form" ref="form" :rules="rules" label-width="80px">
            <el-form-item label="名称" prop="docName">
              <el-input
                v-model="form.docName"
                placeholder="请输入文件夹或报告名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="位置" prop=""> --- </el-form-item>
            <el-form-item label="修改时间" prop=""> -- </el-form-item>
            <el-form-item label="修改人" prop=""> -- </el-form-item>
            <el-form-item label="创建时间" prop=""> -- </el-form-item>
            <el-form-item label="创建人" prop=""> -- </el-form-item>
            <el-form-item label="部门" prop=""> -- </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="权限" name="second">
          <!-- 组或用户 -->
          <el-row :gutter="20">
            <el-col :span="18" :offset="0"> 组或用户 </el-col>
            <el-col :span="6" :offset="0">
              <!-- todo:用户组的查找 -->
              <el-button type="primary" size="default">编辑</el-button>
            </el-col>
          </el-row>
          <el-table
            v-loading="loading"
            :data="permissionList"
            stripe
            @selection-change="handleSelectionChange"
            height="200"
          >
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column
              label="姓名"
              align="center"
              prop="uname"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="所属部门"
              align="center"
              prop="dept_name"
              sortable
              :show-overflow-tooltip="true"
            />
            <el-table-column
              label="操作"
              align="center"
              width="180"
              sortable
              class-name="small-padding fixed-width"
            >
              <template>
                <el-button size="mini" type="text" icon="el-icon-delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 权限设置 -->
          <div>权限设置</div>
          <el-transfer
            v-model="permissioned"
            :data="permissonDictionary"
            :titles="['禁止的权限', '允许的权限']"
            target-order="original"
            filterable
            @change="handleSelectionChange"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
          >
          </el-transfer>
        </el-tab-pane>
        <el-tab-pane label="历史版本" name="third">
            
          <!-- 文件列表 -->
        <!-- todo:将类型type_id对应成相应的字段，比如type_id = 1 是文件夹 -->
        <el-table>
          <el-table-column label="名称" align="center" />
          <el-table-column label="修改人" align="center" />
          <el-table-column
            label="修改时间"
            align="center"
           
          />
        </el-table>
        <!-- 分页条 -->
        <!-- <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        /> -->

        </el-tab-pane>
      </el-tabs>

      <span slot="footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </el-dialog>

    <!-- 忽略：用户导入对话框 -->
  </div>
</template>


<script>
import { listDoc } from "@/api/documents/doc"; //仿user
import { treeselect } from "@/api/documents/docNode";
import {
  NodeFolderPermissionList,
  getNodePermissionDictionary,
} from "@/api/documents/permission";

export default {
  name: "documents",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 总条数
      total: 0,
      // 用户表格数据
      docList: null,
      //目录树选项
      docOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      //目录名称
      docName: undefined,
      //文件表单参数
      form: {},
      defaultProps: {
        children: "nodes",
        label: "text",
        disabled: true,
      },
      //获取树列表的入参
      //todo：参数值应该从路由里取。
      query: {
        fid: 69,
        pid: 69,
        type_id: 1,
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        // userName: undefined,
        // phonenumber: undefined,
        // status: undefined,
        // deptId: undefined
      },
      //创建目录的切换
      activeName: "third",
      // 表单校验
      rules: {
        docName: [
          { required: true, message: "文件名称不能为空", trigger: "blur" },
        ],
      },
      //获取本部门具有权限的用户的信息的入参
      queryParams_getPermissionList: {
        fid: 69,
        pid: 69,
        node_id: 1,
      },
      //获取到权限所有人和其基本信息 get_node_folder_permission_list
      permissionList: {},
      //入参：文件类型，查询具体权限列表
      type_id: 1,
      //回参：查询具体权限列表
      permissonDictionary: [],
      //选中的权限
      permissioned: [],
      //查询历史版本，入参
      queryHisDocList:{},
      //回参
      hisDocList:{
        
      },
      
    };
  },
  watch: {},
  created() {
    this.getList();
    this.getTreeselect(this.query);
    this.getNodeFolderPermissionList(this.queryParams_getPermissionList);
    this.NodePermissionDictionary(this.type_id);
  },
  methods: {
    /** 查询文件列表 */
    getList() {
      this.loading = true;
      listDoc().then((response) => {
        this.docList = response.data;
        this.total = response.data.length;
        this.loading = false;
      });
    },
    /** 查询文件夹下拉树结构 */
    getTreeselect(query) {
      treeselect(query).then((response) => {
        this.docOptions = response.tree_data;
      });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "--属性";
      //todo:发请求获取能够对目录所进行的操作列表：比如查看、编辑、移动、删除

      //todo:发请求获取本部门的全部人员
    },
    /** 提交按钮 */
    submitForm() {
      /** todo:新增成功 */
      /** todo:或者修改成功 */
    },
    /** 取消按钮 */
    cancel() {
      this.open = false;
    },
    /** 创建目录的切换 */
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    /** 给用户赋予权限 */
    handleSelectionChange(selection) {
      console.log(selection);
    },
    /**获取具有用户权限的列表  */
    getNodeFolderPermissionList(queryParams_getPermissionList) {
      NodeFolderPermissionList(queryParams_getPermissionList).then(
        (response) => {
          this.permissionList = response.permission_list;
        }
      );
    },
    /** 获取具体用户权限 */
    NodePermissionDictionary(typeId) {
      getNodePermissionDictionary(typeId).then((response) => {
        let permisson_dictionary = response.permisson_dictionary;
        for(let i = 0;i<=permisson_dictionary.length;i++){
          // todo:这里有个bug，Uncaught (in promise) TypeError: Cannot read property 'name' of undefined
          // console.log(typeof(response.permisson_dictionary[i].id));
          this.permissonDictionary.push({
            key:permisson_dictionary[i]['id'],
            label:permisson_dictionary[i]['name'],
            disabled:false
          })
        }
      });
    },
    /** 选择了某些权限后 */
    handleSelectionChange(value, direction, moveKeys) {
      // console.log(value, direction, moveKeys);
    },
    //创建报告
    creatDoc(){
      //路由，去新的路径
      this.$router.push({path:'/documents/docList/create'});
    }
  },
};
</script>

<style>
</style>