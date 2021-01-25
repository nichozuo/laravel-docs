<template>
  <!-- <a-menu
    class="menu-class"
    mode="inline"
    style="height: 100%"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
  >
    <a-menu-item v-for="item in items" :key="item.key" @click="onClick">
      {{ item.label }}
    </a-menu-item>
  </a-menu> -->

  <a-menu
    class="menu-class"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
  >
    <template v-for="(i, index) in items" :key="i.key ? i.key : index">
      <template v-if="i?.children?.length == 0 || !i.children">
        <a-menu-item :key="i.key ? i.key : index" @click="onClick">
          <span>{{ i.label }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="i" :key="i.key ? i.key : index" />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
  import { API, requests } from '@/api/api'
  import { defineComponent, onMounted, ref, toRaw, watchEffect } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import SubMenu from './SubMenu.vue'

  export default defineComponent({
    components: { 'sub-menu': SubMenu },
    props: {
      type: {
        type: String,
        required: true,
      },
      theKey: {
        type: String,
        required: false,
      },
    },
    emits: ['update:theKey'],
    setup(props, ctx) {
      const selectedKeys = ref([''])
      const openKeys = ref([''])
      const items = ref([])

      const route = useRoute()
      const router = useRouter()
      const path = ref('')

      const onClick = ({ key }: any) => {
        router.push({
          name: props.type,
          query: { theKey: key },
        })
        ctx.emit('update:theKey', key)
      }

      watchEffect(() => {
        console.log(route.path, 'path')

        if (selectedKeys.value[0] && path.value == route.path) {
          router.push({
            query: {
              theKey: selectedKeys.value[0],
              theOpen: JSON.stringify(openKeys.value),
            },
          })
          // route.query = { theKey: selectedKeys.value[0] }
          // console.log(openKeys.value[0], 'openKeys.value[0]')
        }
        if (path.value != route.path) {
          path.value = route.path
        }

        ctx.emit('update:theKey', selectedKeys.value[0])
      })

      onMounted(() => {
        // console.log(route.path, 'route.path')
        requests({ url: API.docs.getMenu, data: { type: props.type } }).then(
          (res) => {
            items.value = res.data
            if (res.data.length > 0 && !route.query.theKey) {
              selectedKeys.value = [res.data[0].key]
              // console.log(selectedKeys, 'selectedKeys')
            }
            if (res.data && route.query.theKey) {
              // console.log('111')
              selectedKeys.value = [route.query.theKey] as any
            }
            if (res.data && route.query.theOpen) {
              openKeys.value = JSON.parse(route.query.theOpen.toString())
            }
            // console.log(route.query.theKey, 'request')
            // console.log(selectedKeys.value, 'request')
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

<style lang="less" scoped>
  .menu-class {
    // width: 300px;
    height: calc(100vh - 190px);
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .menu-class::-webkit-scrollbar {
    width: 4px;
  }
  .menu-class::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
  .menu-class::-webkit-scrollbar-track {
    // height: 260px;
    border-radius: 10px;
    background: rgba(235, 235, 235, 0.95);
  }
</style>
