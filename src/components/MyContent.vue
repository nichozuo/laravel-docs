<template>
  <div>type:{{ props.type }}</div>
  <div>key:{{ props.theKey }}</div>
  <div id="content">content:{{ content }}</div>
</template>

<script lang="ts">
  import { requests, API } from '@/api/api'
  import { defineComponent, ref, watchEffect } from 'vue'

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
    setup(props) {
      const content = ref('')

      watchEffect(() => {
        console.log('props.theKey', props.theKey)
        if (!props.theKey) return
        requests({
          url: API.docs.getContent,
          data: { type: props.type, key: props.theKey },
        }).then((res) => {
          console.log(res)
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
