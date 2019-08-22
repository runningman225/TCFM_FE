
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import ManagePayment from '@/page/ManagePayment'
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
    wrapper = shallowMount(ManagePayment, {
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
describe('Expense.vue',() =>{
    test('setup correctly', ()=>{
        const querySelectorSpy = jest.spyOn(document, 'querySelector')
        wrapper.vm.scroll()
        expect(querySelectorSpy).toHaveBeenCalledTimes(1)
    })


})

