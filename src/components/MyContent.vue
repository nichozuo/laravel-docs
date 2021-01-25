<template>
  <div id="content" class="custom">
    <vue-markdown-it :source="content" />
  </div>
</template>

<script lang="ts">
  import { requests, API } from '@/api/api'
  import { defineComponent, ref, watchEffect } from 'vue'
  import VueMarkdownIt from 'vue3-markdown-it'

  export default defineComponent({
    components: {
      VueMarkdownIt,
    },
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
    setup(props) {
      const content = ref('')

      watchEffect(() => {
        // console.log('props.theKey', props.theKey)
        if (!props.theKey) return
        requests({
          url: API.docs.getContent,
          data: { type: props.type, key: props.theKey },
        }).then((res) => {
          // console.log(res)
          content.value = res.data.content
        })
      })
      return {
        props,
        content,
      }
    },
  })
</script>

<style lang="less" scoped>
  .custom {
    height: calc(100vh - 190px);
    overflow-x: hidden;
    box-sizing: border-box;
    overflow-y: scroll;
    table {
      margin: 20px 0;
      width: 100%;
      border-top: 1px solid #f8f8f8;
      border-left: 1px solid #f8f8f8;
      border-bottom: 1px solid #f8f8f8;
      thead {
        height: 40px;
        line-height: 40px;
        background-color: #eee;
        font-weight: bold;
        th {
          padding: 0 10px;
          border-right: 1px solid #f8f8f8;
        }
      }
      tbody {
        font-size: 13px;
        font-weight: 400;
        tr {
          height: 35px;
          line-height: 35px;
          border-top: 1px solid #f8f8f8;
          td {
            border-right: 1px solid #f8f8f8;
            padding: 0 10px;
          }
          &:nth-child(even) {
            background-color: #f9f9f9;
          }
          &:hover {
            background-color: #f0faff;
          }
        }
      }
    }
  }

  .custom::-webkit-scrollbar {
    width: 4px;
  }
  .custom::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #ccc;
  }
  .custom::-webkit-scrollbar-track {
    // height: 260px;
    border-radius: 10px;
    background: rgba(235, 235, 235, 0.95);
  }
</style>
