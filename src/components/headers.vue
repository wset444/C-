<template>
    <div class="header">
        <van-icon @click="goBack" name="arrow-left" class="header-left" size="28"></van-icon>
        {{ props.title }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps(['title'])
const router = useRouter()
const goBack = () => {
    router.go(-1)
}

</script>
<style lang="less" scoped>
.header {
    padding: 10px 0;
    text-align: center;
    line-height: 30px;
    font-size: 15px;

    .header-left {
        float: left;
    }
}
</style>
