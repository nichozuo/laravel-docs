<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$attrs">
    <template #title>
      <span>
        <span>{{ menuInfo.label }}</span>
      </span>
    </template>
    <template
      v-for="(item, idxs) in menuInfo.children"
      :key="item.key ? item.key : idxs"
    >
      <template v-if="!item.children">
        <a-menu-item :key="item.key ? item.key : idxs">
          <span>{{ item.label }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.key ? item.key : idxs" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
  import { PieChartOutlined, MailOutlined } from '@ant-design/icons-vue'
  import { useStore } from 'vuex'
  const store = useStore()
  export default {
    components: {
      PieChartOutlined,
      MailOutlined,
    },
    name: 'SubMenu',
    props: {
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
    watch: {
      menuInfo(e) {
        console.log(e, 'skkk')
      },
    },
    methods: {
      titleClick(e) {
        console.log('titleClick', e)
        this.getConent(e.key)
      },
      getConent(key) {
        store.dispatch('menu/getContentAction', store.state.menuType)
      },
    },
  }
</script>

<style></style>
