declare module 'vuex' {
  import { Store, StoreOptions, MutationTree, ActionTree, GetterTree } from 'vuex'
  export { Store, StoreOptions, MutationTree, ActionTree, GetterTree }
  export * from 'vuex/types/index.d.ts'
  export * from 'vuex/types/helpers.d.ts'
  export * from 'vuex/types/logger.d.ts'
  export * from 'vuex/types/vue.d.ts'
}
