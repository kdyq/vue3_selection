<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <el-button type="success" size="default" :icon="Edit">编辑按钮</el-button>
    <el-button type="danger" size="default" :icon="Delete">删除按钮</el-button>
  </div>
</template>
