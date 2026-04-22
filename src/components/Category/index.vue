<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select class="select-width" v-model="categoryStore.c1Id" @change="handler1">
                    <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select class="select-width" v-model="categoryStore.c2Id" @change="handler2">
                    <el-option v-for="c2 in categoryStore.c2Arr" :label="c2.name" :key="c2.id" :value="c2.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select class="select-width" v-model="categoryStore.c3Id">
                    <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>

</template>

<script setup lang="ts" name='category'>
import { useCategoryStore } from '@/store/modules/catrogry';
import { onMounted } from 'vue';
const categoryStore = useCategoryStore();
onMounted(() => {
    //获取一级分类数据
    getC1();
})
const getC1 = () => {
    categoryStore.getC1();
}
//一级分类下的change事件
const handler1 = () => {
    //先清空二、三级分类数据
    categoryStore.c2Id = ''
    categoryStore.c2Arr = []
    categoryStore.c3Id = ''
    //获取数据
    categoryStore.getC2();
}
//二级分类下的change事件
const handler2 = () => {
    //清空三级分类数据
    categoryStore.c3Id = ''
    // 获取数据
    categoryStore.getC3();
}

</script>

<style scoped lang="scss">
.select-width {
    width: 220px;
}
</style>