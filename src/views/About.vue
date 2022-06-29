<template>
  <div class="about">
    {{count}}
    <button @click="changeCount">count+1</button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
  // asyncData(store: any){
  //   return store.state.count;
  // },
  setup() {
    const store = useStore()
    const state = reactive({
    })
    const count = computed(()=>{
      return store.state.count
    })
    const changeCount = ()=>{
      store.commit('increment')
    }
    return {
      ...toRefs(state),
      changeCount,
      count
    }
  },
})
</script>
