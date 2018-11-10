import collect from 'bisheng/collect';
import SimpleMainContent from './SimpleMainContent';
import * as utils from '../utils';

export default collect(async nextProps => {
  const pathname = nextProps.location.pathname;

  const path = pathname.replace('-cn', '');

  const pageDataPath = path.split('/');

  const pageData = nextProps.utils.get(nextProps.data, pageDataPath);

  console.log(pageDataPath);
  console.log(pageData);

  if (!pageData) {
    throw 404; // eslint-disable-line no-throw-literal
  }

 // const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
 const locale = 'zh-CN'; //FIXME: solid to chinese
  const pageDataPromise =
    typeof pageData === 'function'
      ? pageData()
      : (pageData[locale] || pageData.index[locale] || pageData.index)();
  return { localizedPageData: await pageDataPromise };
})(SimpleMainContent);
