
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import userContributedWindow from '@/components/userContributedWindow'
import {GlobalWithFetchMock} from "jest-fetch-mock";
import VueRouter from 'vue-router';
import { V4MAPPED } from 'dns';


let wrapper
let store
let actions
let mutations
let state
let router = new VueRouter()
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.filter('dateFormatter',jest.fn())
localVue.filter('thousandSeparators',jest.fn())


store = new Vuex.Store({
    modules:{
        getters: jest.fn(),
        actions: jest.fn(),
        state: jest.fn(),
        mutations: jest.fn(),
    }
  })

beforeEach(()  => {
    fetch.resetMocks()
    window.alert=jest.fn()
    const expectedResponse={ok:true}
    fetch.mockResponseOnce(JSON.stringify(expectedResponse))
    wrapper = shallowMount(userContributedWindow, {
        stubs:['HeaderSection','SidebarComponent'],
        propsData:{
            userList:['a','b','c','d']
        },
        mocks:{
        },
        store,
        localVue,   
        router,
    });
})
afterEach(() => {
    jest.clearAllMocks()
    wrapper.destroy()
})
describe('PaymentHistory.vue',() =>{
    test('setup correctly', ()=>{
        expect(wrapper.isVueInstance).toBeTruthy()
        expect(wrapper.vm.dataUserContributed.length).toBe(4)
    })
    test('close event emitted', ()=>{
        wrapper.vm.closeContributedWindow()
        expect(wrapper.emitted('closeContributedWindow').length).toBe(1)
    })

})

