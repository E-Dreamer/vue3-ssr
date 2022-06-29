import { createStore as _createStore } from 'vuex'

export function createStore() {
  const store = _createStore({
    state: {
      count: 1,
    },
    mutations: {
      increment(state) {
        state.count++
      },
    },
    actions: {},
    modules: {},
  })
  try {
    if (window && (window as any).__INITIAL_STATE__) {
      store.replaceState((window as any).__INITIAL_STATE__)
    }
  } catch (error) {
    console.log('有一个错', error.message)
  }

  return store
}
