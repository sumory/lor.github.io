const path = require('path');

const homeTmpl = './template/Home/index';
const contentTmpl = './template/Content/index';
const simpleTmpl = './template/Content/Simple';

function pickerGenerator(dir, module = '') {
  const tester = new RegExp(`^${dir}/${module}`);
  return markdownData => {
    const filename = markdownData.meta.filename;
    if (tester.test(filename) && !/\/demo$/.test(path.dirname(filename))) {
      return {
        meta: markdownData.meta,
      };
    }
  };
}

const pluginAntdConfig = {
  babelConfig: JSON.stringify({
    plugins: [
      require.resolve('babel-plugin-transform-class-properties'),
      require.resolve('babel-plugin-transform-object-rest-spread'),
      require.resolve('babel-plugin-transform-decorators-legacy'),
    ],
  }),
};

module.exports = {
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true;
    }
    return nodePath.endsWith('/demo');
  },
  pick: {
    docs: pickerGenerator("docs"),
    api: pickerGenerator("api"),
    update: pickerGenerator("update"),
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    `bisheng-plugin-antd?${JSON.stringify(pluginAntdConfig)}`,
    `bisheng-plugin-react?${JSON.stringify(pluginAntdConfig)}`,
  ],
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: homeTmpl },
    childRoutes: [
      {
        path: 'index-cn',
        component: homeTmpl,
      },
      {
        path: '/docs/:children',
        component: contentTmpl,
      },
      {
        path: '/api/:children',
        component: contentTmpl,
      },
      {
        path: '/update/:children',
        component: simpleTmpl,
      },
    ],
  },
};
