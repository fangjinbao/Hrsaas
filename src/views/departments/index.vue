<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools
          :tree-node="company"
          :is-root="true"
          @addDepts="addDepts"
        />
        <el-tree :data="departs" :props="defaultProps" draggable :default-expand-all="true">
          <TreeTools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 新增部门 -->
    <addDept
      ref="addDept"
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import TreeTools from './components/TreeTools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import addDept from './components/addDept'
export default {
  components: { TreeTools, addDept },
  data() {
    return {
      company: {}, // 公司数据
      departs: [], // 部门数据
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showDialog: false, // 新增是否显示弹窗
      node: null // 记录当前点击的node值
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
    },
    // 添加子部门
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    // 编辑部门
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
//  .red {
//   background-color:red;
//   color: #fff;
//  }
//  .blue {
//   background-color: blue;
//   color: #fff;
//  }

</style>
