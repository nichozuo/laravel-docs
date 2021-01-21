<template>
  <Loading />
  <a-layout id="layout">
    <a-layout-header class="header">
      <div class="title">API文档</div>
      <div class="refresh">
        <a-button>刷新</a-button>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :style="{ lineHeight: '64px' }"
        @click="onClick"
      >
        <a-menu-item key="/readme">
          <ReadOutlined />
          说明
        </a-menu-item>
        <a-menu-item key="/module">
          <CloudServerOutlined />
          模块Api文档
        </a-menu-item>
        <a-menu-item key="/database">
          <DatabaseOutlined />
          数据字典
        </a-menu-item>
        <a-menu-item key="/php">
          <ConsoleSqlOutlined />
          后端代码生成
        </a-menu-item>
        <a-menu-item key="/js">
          <GlobalOutlined />
          前端代码生成
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <router-view />
    <a-layout-footer style="text-align: center">
      Created by Nichozuo © 2021
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
  import {
    ReadOutlined,
    CloudServerOutlined,
    ConsoleSqlOutlined,
    DatabaseOutlined,
    GlobalOutlined,
  } from '@ant-design/icons-vue'
  import { defineComponent, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Loading from '@/components/Loading.vue'

  export default defineComponent({
    components: {
      ReadOutlined,
      CloudServerOutlined,
      ConsoleSqlOutlined,
      DatabaseOutlined,
      GlobalOutlined,
      Loading,
    },
    setup() {
      const selectedKeys = ref(['readme'])
      const router = useRouter()

      onMounted(() => {
        selectedKeys.value = [location.pathname]
      })
      const onClick = ({ key }: any) => {
        router.push(key)
      }
      return {
        selectedKeys,
        onClick,
      }
    },
  })
</script>

<style lang="less" scoped>
  #layout {
    height: 100vh;
    .title {
      width: 180px;
      float: left;
      text-align: center;
      color: white;
      font-size: 18px;
    }
    .refresh {
      float: right;
      margin-right: 20px;
    }
  }
</style>
