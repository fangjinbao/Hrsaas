<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" draggable :default-expand-all="true">
          <TreeTools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/TreeTools'
export default {
  components: { TreeTools },
  data() {
    return {
      company: { name: 'PM产品铺子', manager: '方金宝' },
      departs: [
        { name: '总裁办', manager: '方金宝', children: [{ name: '董事会', manager: '郭思思' }] },
        { name: '行政部', manager: '黄静静' },
        { name: '人事部', manager: '黄东东' }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
 .red {
  background-color:red;
  color: #fff;
 }
 .blue {
  background-color: blue;
  color: #fff;
 }

</style>
