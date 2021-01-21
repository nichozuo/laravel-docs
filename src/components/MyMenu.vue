<template>
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
</template>

<script lang="ts">
  import { API, requests } from '@/api/api'
  import { defineComponent, onMounted, ref, toRaw, watchEffect } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  export default defineComponent({
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

      const router = useRouter()

      const onClick = ({ key }: any) => {
        router.push({ name: props.type, query: { theKey: key } })
        ctx.emit('update:theKey', key)
      }

      watchEffect(() => {
        const data = toRaw(items.value)
        if (data.length > 0) {
          if (props.theKey == undefined || props.theKey == '') {
            console.log(data, data.length, data[0]['key'])
            selectedKeys.value = [data[0]['key']]
            ctx.emit('update:theKey', data[0]['key'])
          } else {
            selectedKeys.value = [props.theKey as string]
          }
        }
      })

      onMounted(() => {
        console.log('MyMenu onMounted')
        requests({ url: API.docs.getMenu, data: { type: props.type } }).then(
          (res) => {
            items.value = res.data
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
