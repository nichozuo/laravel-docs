import { createStore } from 'vuex'
import loading from './modules/loading'

export interface StateType {
  auth: { user: object; permissions: object }
  loading: { loading: object }
}

export default createStore({
  modules: {
    loading,
  },
})
