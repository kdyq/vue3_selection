<template>
    <div>
        <!-- 三级分类组件 -->
        <Category :scene="scene" />
        <el-card style="margin: 10px 0;">
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
                    @click="addAttr">添加属性</el-button>
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
                                <el-button type="warning" size="default" icon="Edit" @click="changeAttr"></el-button>
                            </el-tooltip>
                            <el-popconfirm :title="`确定删除 这个 吗？`" width="auto">
                                <template #reference>
                                    <el-button type="danger" icon="Delete" title="删除" </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <!-- 展示添加属性和修改数据的结构 -->
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus">添加属性</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
                <el-table border stripe style="margin: 10px 0;">
                    <el-table-column label="序号" type="index" align="center" width="80px">
                    </el-table-column>
                    <el-table-column label="属性值名称"></el-table-column>
                    <el-table-column label="属性值操作"></el-table-column>
                </el-table>
                <el-button type="primary" size="default">保存</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
            </div>
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
//控制card组件的变化
const scene = ref<number>(0)//0展示table，1展示添加或修改
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
//添加属性按钮
const addAttr = () => {
    scene.value = 1;
}
//修改属性按钮
const changeAttr = () => {
    scene.value = 1;
}
//取消按钮
const cancel = () => {
    scene.value = 0;
}
</script>

<style scoped lang="scss"></style>