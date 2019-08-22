
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import overview from '@/page/overview'
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
    fetch.mockResponseOnce(JSON.stringify(expectedResponse))
    wrapper = shallowMount(overview, {
        stubs:['HeaderSection','SidebarComponent'],
        mocks:{
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
describe('Overview.vue',() =>{
    test('setup correctly', ()=>{
        const value = ''
        Object.defineProperty(global, EventSource, { value, writable: true });

        // const spyEs = jest.spyOn(wrapper.vm, 'es')
        wrapper.vm.streamPersonalNotification()
        // expect(spyEs).toBeDefined()
        expect(wrapper.isVueInstance).toBeTruthy()
    })
})

