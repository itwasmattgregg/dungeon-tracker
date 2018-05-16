import Vue from 'vue'
import Landing from '@/components/Landing'

describe('Landing.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Landing)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent)
    .toEqual('Welcome to the D&D Companion App')
  })
})
