import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product)
    }
    // Другие мутации, если необходимо
  },
  actions: {
    // Другие действия, если необходимо
  },
  getters: {
    // Другие геттеры, если необходимо
  }
})