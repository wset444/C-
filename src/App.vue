<template>
  <router-view></router-view>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item v-for="item in routerList" replace :url="`#/${item.path}`" :icon="item.meta.icon"
        :key="item.path">{{
      item.meta.name
    }}</van-tabbar-item>
      <!-- <van-tabbar-item replace to="/search" icon="search">订单</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">我的</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
const router = useRouter()
const route = useRoute()
const routerList = router.options.routes[0].children
const active = ref(0)
console.log(routerList);

onMounted(() => {
  const data = router.options.routes[0]
  active.value = data.children.findIndex(item => '/' + item.path === route.path)
})

</script>
<style scoped></style>
