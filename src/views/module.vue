<template>
  <a-layout-sider width="250" style="background: #fff">
    <MyMenu type="modules" v-model:theKey="theKey" />
  </a-layout-sider>
  <a-layout-content :style="{ padding: '0 50px', minHeight: '280px' }">
    <MyContent type="modules" :theKey="theKey" />
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
        console.log('modules onMounted')
        theKey.value = route.query['theKey'] as string
      })

      return { theKey }
    },
  })
</script>
