<template>
  <el-row type="flex" justify="space-between" style="height: 40px;width: 100%;" align="middle">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
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

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="sass" scoped>

</style>
