<template>
  <div class="list-com">
    <el-table :data="list" style="width: 100%" @row-click="rowClick">
      <el-table-column label="名称" prop="fileName"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["row-click"]);

const rowClick = (row, column, event) => {
  emit("row-click", row, column, event);
};
</script>

<style lang="less" scoped></style>
