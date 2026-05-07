<template>
    <div>
        <!-- 三级分类 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0;">
            <div v-show="scene == 0">
                <div>
                    <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
                        @click="addSpu">添加SPU</el-button>
                    <el-table border style="margin: 10px 0;" :data="records">
                        <el-table-column label="序号" type="index" align="center" width="80px">
                        </el-table-column>
                        <el-table-column label="SPU名称" prop="spuName" width="120px">
                        </el-table-column>
                        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="操作" width="250px">
                            <template v-slot="{ row }">
                                <el-button type="primary" size="default" icon="Plus" title="添加SKU"></el-button>
                                <el-button type="warning" size="default" icon="Edit" title="修改SPU"
                                    @click="updateSpu(row)"></el-button>
                                <el-button type="info" size="default" icon="View" title="查看SKU列表"></el-button>
                                <el-button type="danger" size="default" icon="Delete" title="删除SPU"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页器 -->
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 7, 9]" :background="true" layout="prev, pager, next, jumper,->,sizes,total"
                    :total="total" :pager-count="5" @current-change="getHasSpu" @size-change="changePageSize" />
            </div>
            <!-- 添加或修改spu -->
            <spuForm ref="spu" v-show="scene == 1" @change-scene="changeScene" />
            <!-- 添加SKU -->
            <skuForm v-show="scene == 2" />
        </el-card>
    </div>
</template>

<script setup lang="ts" name="spu">
import { ref, watch } from 'vue';
import { reqHasSpu } from '@/api/product/spu'
import type { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type';
import { useCategoryStore } from '@/store/modules/catrogry';
//引入子组件
import spuForm from './spuForm.vue';
import skuForm from './skuForm.vue';
const categoryStore = useCategoryStore();
const spu = ref<any>();
//定义场景
const scene = ref<number>(0);//0：显示已有SPU  1：添加或修改SPU 2：添加SKU
//默认页码
const currentPage = ref<number>(1);
//默认每页显示的条数
const pageSize = ref<number>(3);
//总条数
const total = ref<number>(0);
// 存储已有的SPU数据
const records = ref<Records>([])
//获取某个三级分类下的SPU列表
const getHasSpu = async (page = 1) => {
    currentPage.value = page;
    const result: HasSpuResponseData = await reqHasSpu(currentPage.value, pageSize.value, categoryStore.c3Id);
    if (result.code == 200) {
        records.value = result.data.records;
        total.value = result.data.total;
    }
}
//监听三级分类id的变化
watch(() => categoryStore.c3Id, () => {
    //清空SPU数据
    currentPage.value = 1;
    total.value = 5;
    if (categoryStore.c3Id) {
        getHasSpu();
    }
})
//改变每页显示的条数
const changePageSize = () => {
    getHasSpu();
}
//添加SPU
const addSpu = () => {
    scene.value = 1;
    //调用子组件方法
    spu.value.initAddSpu(categoryStore.c3Id)
}
// 修改SPU
const updateSpu = (row: SpuData) => {
    //切换场景
    scene.value = 1;
    //调用子组件方法获取完整的SPU数据
    spu.value.initHasSpuData(row)
}
//子组件spuForm的自定义事件
const changeScene = ({ flag, params }: { flag: number; params: string }) => {
    scene.value = flag;
    //再次获取已有的SPU数据
    if (params == 'update') {
        //更新留在当前页
        getHasSpu(currentPage.value);
    } else {
        //添加留在第一页
        getHasSpu();
    }

}
</script>

<style scoped></style>