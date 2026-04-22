<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select class="select-width">
                    <el-option label="北京" value="beijing">
                    </el-option>
                    <el-option label="上海" value="shanghai">
                    </el-option>
                    <el-option label="深圳" value="shenzhen">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select class="select-width">
                    <el-option label="北京" value="beijing">
                    </el-option>
                    <el-option label="上海" value="shanghai">
                    </el-option>
                    <el-option label="深圳" value="shenzhen">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select class="select-width">
                    <el-option label="北京" value="beijing">
                    </el-option>
                    <el-option label="上海" value="shanghai">
                    </el-option>
                    <el-option label="深圳" value="shenzhen">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>

</template>

<script setup lang="ts" name='category'>

</script>

<style scoped lang="scss">
.select-width {
    width: 220px;
}
</style>