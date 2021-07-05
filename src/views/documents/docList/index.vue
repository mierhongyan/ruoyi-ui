<template>
  <div class="app-container">
    <el-row>
      <!-- 文件夹目录 -->
      <el-col :span="4" :offset="0">
        <div class="head-container">
          <el-input
            v-model="docName"
            placeholder="请输入文件或文件夹名称"
            size="small"
            clearable
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          ></el-input>
        </div>
        <div class="head-container">
          <el-tree
            ref="tree"
            :data="docOptions"
            node-key=""
            :props="defaultProps"
            empty-text=""
            show-checkbox="false"
            highlight-current="true"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </el-col>

    </el-row>
  </div>
</template>


<script>
import {treeselect} from "@/api/system/docNode";

export default {
  name: "documents",
  data() {
    return {
      //目录树选项
      docOptions: undefined,
      //目录名称
      docName: undefined,
      //表单参数
      form: {},
      defaultProps:{
        children: "nodes",
        label: "text",
        disabled:true
      },
      //获取树列表的入参
      //todo：参数值应该从路由里取。
      query:{
        fid:69,
        pid:69,
        type_id:1
      }
    };
  },
  watch:{

  },
  created(){
    this.getTreeselect(this.query);
  },
  methods:{
    // 节点单击事件
    handleNodeClick(data) {
      
    },
    /** 查询文件夹下拉树结构 */
    getTreeselect(query) {
      treeselect(query).then(response => {
        this.docOptions = response.tree_data;
        // this.deptOptions = response.data;
      });
    },
  }
};
</script>

<style>
</style>