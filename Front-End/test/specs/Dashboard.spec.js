
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import dashboard from '@/page/dashboard'
import {GlobalWithFetchMock} from "jest-fetch-mock";
import VueRouter from 'vue-router';


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
localVue.filter('fromNow',jest.fn())


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
    const expectedResponse =  ['a','b','c'] 
    fetch.mockResponse(JSON.stringify(expectedResponse))
    wrapper = shallowMount(dashboard, {
        stubs:['HeaderSection','SidebarComponent'],
        mocks:{
            scroll : jest.fn()
        },
        store,
        localVue,   
        router,
        attachToDocument: true
    });
})
afterEach(() => {
    jest.clearAllMocks()
    wrapper.destroy()
})
describe('Dashboard.vue',() =>{
    test('setup correctly', ()=>{
        expect(wrapper.isVueInstance).toBeTruthy()
    })
})

