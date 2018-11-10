import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Row, Col, Badge } from 'antd';
import * as utils from '../utils';
import { Icon } from 'antd';

class Footer extends React.Component {
  handleLangChange = () => {
    const { pathname } = this.props.location;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }

    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname))
      );
  };

  render() {
    const { pathname } = this.props.location;
    const isZhCN = utils.isZhCN(pathname);
    return (
      <footer id="footer">
        <div className="footer-wrap">
          <Row>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <FormattedMessage id="app.footer.resources" />
                </h2>
                <div>
                  <a href="https://github.com/lorlabs/lor-example">Lor example</a>
                </div>
                <div>
                  <a href="https://github.com/sumory/openresty-china">OpenResty China Site</a>
                </div>
              </div>
            </Col>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <FormattedMessage id="app.footer.community" />
                </h2>
                <div>
                  <a href="https://orchina.org/">OpenResty China</a>
                </div>
              </div>
            </Col>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <FormattedMessage id="app.footer.help" />
                </h2>
                <div>
                  <a target="_blank " href="https://github.com/sumory/lor">
                    GitHub
                  </a>
                </div>
                <div>
                  <a href="/update/index-cn">
                    <FormattedMessage id="app.footer.change-log" />
                  </a>
                </div>
                <div>
                  <a target="_blank " href="/docs/issues-cn">
                    常见问题
                  </a>
                </div>
              </div>
            </Col>
            <Col md={6} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <FormattedMessage id="app.footer.more-product" />
                </h2>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/sumory/orange">
                    Orange
                  </a>
                  <span> - </span>
                  基于OpenResty的通用API网关
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bottom-bar">
        Copyright © 2016 ~ {new Date().getFullYear()} &nbsp;&nbsp;
        <Icon type="code" theme="outlined" />  with <Icon type="heart" theme="outlined" /> by Sumory
        </div>
      </footer>
    );
  }
}

export default injectIntl(Footer);
