import React from 'react';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import * as utils from '../utils';

function Banner(props) {
  const isZhCN = utils.isZhCN(location.pathname);
  return (
    <div className="banner-wrapper">
      <QueueAnim className="banner-title-wrapper" type={props.isMobile ? 'bottom' : 'right'}>
        <h1 key="h1">Lor Framework<sup>v0.3.4</sup></h1>
        <p key="content">
          <FormattedMessage id="app.home.slogan" />
        </p>
        <div key="button" className="button-wrapper">
          <Link to={utils.getLocalizedPathname('/docs/getting-started', isZhCN)}>
            <Button style={{ margin: '0 16px' }} type="primary" ghost>
              <FormattedMessage id="app.home.start" />
            </Button>
          </Link>
          <div style={{ margin:"20", height:"30px"}}></div>
          <GitHubButton
            key="github-button"
            type="stargazers"
            namespace="sumory"
            repo="lor"
          />
        </div>
      </QueueAnim>
    </div>
  );
}

export default Banner;
