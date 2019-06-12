import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    //state为状态数据，触发action，mutations会去改变state的值，getters对外提拱state的值。
    state:{
        domain:'https://saas-manage.msxiaodai.com',
        isLeftHiden:false,//隐藏侧边栏
        showmenu:true,//是否显示菜单栏
    }
})