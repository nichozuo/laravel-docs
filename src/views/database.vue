<template>
  <a-layout-sider width="250" style="background: #fff">
    <MyMenu type="database" v-model:theKey="theKey" />
  </a-layout-sider>
  <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
    <MyContent type="database" :theKey="theKey" />
  </a-layout-content>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import MyMenu from '@/components/MyMenu.vue'
  import MyContent from '@/components/MyContent.vue'
  import { useRoute } from 'vue-router'

  export default defineComponent({
    components: { MyMenu, MyContent },
    setup() {
      const theKey = ref('')
      const route = useRoute()

      onMounted(() => {
        console.log('database onMounted')
        theKey.value = route.query['theKey'] as string
      })

      return { theKey }
    },
  })
</script>
