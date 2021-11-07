import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' }, // 首页
    { path: '/example', component: '@/pages/example/index' }, // 例子页
  ],
  fastRefresh: {},
});
