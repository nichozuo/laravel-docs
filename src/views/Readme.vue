<template>
  <a-layout-sider width="250" style="background: #fff">
    <a-menu
      mode="inline"
      style="height: 100%"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    >
      <a-menu-item v-for="item in items" :key="item.key" @click="onClick">
        {{ item.label }}
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
  <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
    <div id="content">点击左侧</div>
  </a-layout-content>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { requests, API } from '@/api/api'
  import { useRoute, useRouter } from 'vue-router'

  export default defineComponent({
    setup() {
      const selectedKeys = ref([''])
      const openKeys = ref([''])
      const items = ref([])

      const route = useRoute()
      const router = useRouter()

      const onClick = ({ key }: any) => {
        router.push({ name: 'readme', params: { key: key } })
      }

      onMounted(() => {
        requests({ url: API.docs.getMenu, data: { type: 'readme' } }).then(
          (res) => {
            items.value = res.data
            if (res.data.length > 0) {
              if (route.params['key']) {
                selectedKeys.value = [route.params['key'] as string]
              } else {
                selectedKeys.value = [res.data[0]['key']]
              }
            }
          }
        )
      })

      return {
        items,
        selectedKeys,
        openKeys,
        onClick,
      }
    },
  })
</script>
