<template>
    <div>
        <!-- 三级分类组件 -->
        <Category />
        <el-card style="margin: 10px 0;">
            <el-button type="primary" size="default" icon="Plus"
                :disabled="categoryStore.c3Id ? false : true">添加属性</el-button>
            <el-table border style="margin: 10px 0;" :data="attrArr">
                <el-table-column label="序号" type="index" align="center" width="80px">
                </el-table-column>
                <el-table-column label="属性名称" width="120px" prop="attrName">
                </el-table-column>
                <el-table-column label="属性值名称">
                    <template v-slot="{ row }">
                        <el-tag style="margin: 5px;" v-for="item in row.attrValueList" :key="item.id">
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160px">
                    <template v-slot="{ row }">
                        <el-tooltip content="编辑" placement="top">
                            <el-button type="warning" size="default" icon="Edit"></el-button>
                        </el-tooltip>
                        <el-popconfirm :title="`确定删除 ${row.tmName} 吗？`" width="auto">
                            <template #reference>
                                <el-button type="danger" icon="Delete" title="删除" </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts" name='attr'>
import { useCategoryStore } from '@/store/modules/catrogry';
import { reqAttr } from '@/api/product/attr';
import { watch, ref } from 'vue';
import type { AttrResponseData, Attr } from '@/api/product/attr/type';
const categoryStore = useCategoryStore();
//存储已有属性值和属性对象
const attrArr = ref<Attr[]>([])
//监听三级分类id的变化
watch(() => categoryStore.c3Id, () => {
    //清空属性数据
    attrArr.value = [];
    if (categoryStore.c3Id) {
        getAttr();
    }
})
//获取已有属性数据
const getAttr = async () => {
    const result: AttrResponseData = await reqAttr(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id);
    attrArr.value = result.data;
}
</script>

<style scoped lang="scss"></style>