<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
/* 整体布局样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  text-decoration: none;
}

html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  height: 100%;
  background-color: rgb(232, 234, 235);
}

/* 菜单路径 */
.heading-top{
    padding: 8px 15px;
    font-size: 12px;
    line-height: 24px;
    margin-bottom: 10px;
    background-color: #c9cccf;
    border-radius: 4px;
    border: 1px solid #eee;
    color: #777;
}

/* 返回顶部 */
.gotop {
  position: fixed;
  z-index: 9999;
  right: 23px;
  bottom: 33px;

  display: none;

  cursor: pointer;
  -webkit-transition: .3s;
          transition: .3s;
  -webkit-transition-timing-function: linear; /* Safari and Chrome */
          transition-timing-function: linear;

  opacity: .4;
  border-radius: 50%;
}
.bg{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute; 
    top: 0;
    left: 0;
    animation: pulse 5s infinite;
}
@keyframes pulse {
    0% {
        box-shadow: 0 0 6px 6px #fff;
    }
    50% {
        box-shadow: 0 0 6px 6px #57e9e9;
    }
    100% {
        box-shadow: 0 0 6px 6px #fff;
    }
}
.circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.gotop:hover {
  bottom: 38px;

  opacity: 1;
  
}

/* 搜索框内部样式 */
.searcharea {
  margin-bottom: 5px;
  padding: 16px;

  border: 1px solid rgba(211, 209, 209, .466);
  border-radius: 10px;
  background: #f9f9f9;
}

/* 输入框默认宽度 */
.el-input {
  width: 140px !important;
}

/* 时间输入框 */
.shi {
  width: 210px !important;
}

/* 搜索和重置部分 */
.di {
  text-align: center;
}

.line-bin{
  font-family: '黑体';
  width:100%;
  height: 50px;
  line-height: 50px;
  border-radius: 4px;
  background: rgb(214, 213, 213);
  padding-left: 15px;
  font-size: 14px;
  margin-bottom: 10px;
}

/* 图标样式 */
svg {
  padding: 3px 10px;
}
</style>
