<template>
  <el-row type="flex" justify="space-between" style="height: 40px;width: 100%;" align="middle">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/departments'
export default {
  name: 'TreeTools',
  props: {
    // 节点数据
    treeNode: {
      required: true,
      type: Object
    },
    // 是否是根节点，用于显示不用的操作
    isRoot: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

    }
  },
  methods: {
    // 编辑\删除\新增部门
    operateDepts(type) {
      if (type === 'add') {
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        this.$emit('editDepts', this.treeNode)
      } else {
        this.$confirm('您确定要删除该部门吗？').then(() => {
          return delDepartment(this.treeNode.id)
        }).then(() => {
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
