import db from '../../firebaseInit'

const state = {
  availableCampaigns: [],
  selectedCampaign: null
}

// actions
const actions = {
  getCampaigns ({ commit, state }) {
    let cities = []
    db.collection('campaigns').onSnapshot(function (querySnapshot) {
      cities = []
      querySnapshot.forEach(function (doc) {
        cities.push(doc.data().name)
      })
      console.log(cities)
    })

    commit('setCampaigns', cities)
  }
}

// mutations
const mutations = {
  setCampaigns (state, payload) {
    state.availableCampaigns = payload
  }
  // pushProductToCart (state, { id }) {
  //   state.items.push({
  //     id,
  //     quantity: 1
  //   })
  // },

  // incrementItemQuantity (state, { id }) {
  //   const cartItem = state.items.find(item => item.id === id)
  //   cartItem.quantity++
  // },

  // setCartItems (state, { items }) {
  //   state.items = items
  // },

  // setCheckoutStatus (state, status) {
  //   state.checkoutStatus = status
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
