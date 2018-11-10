import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Row, Col, Menu, Icon } from 'antd';
import classNames from 'classnames';
import Article from './Article';
import * as utils from '../utils';

function getModuleData(props) {
  const pathname = props.location.pathname;
  const moduleName = pathname.split('/').filter(item => item).slice(0, -1).join('/');
  const moduleData = props.picked[moduleName];

  console.log(props.picked);

  const excludedSuffix = utils.isZhCN(props.location.pathname) ? 'en-US.md' : 'zh-CN.md';
  return moduleData.filter(({ meta }) => !meta.filename.endsWith(excludedSuffix));
}

export default class SimpleMainContent extends React.PureComponent {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openKeys: this.getSideBarOpenKeys(props) || [],
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps) {
    const openKeys = this.getSideBarOpenKeys(nextProps);
    if (openKeys) {
      this.setState({
        openKeys,
      });
    }
  }

  componentDidUpdate() {
    if (!location.hash) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        document.getElementById(decodeURI(location.hash.replace('#', ''))).scrollIntoView();
      }, 10);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleMenuOpenChange = openKeys => {
    this.setState({
      openKeys,
    });
  };

  getSideBarOpenKeys(nextProps) {
    const pathname = nextProps.location.pathname;
    const prevModule = this.currentModule;
    this.currentModule = pathname.replace(/^\//).split('/')[1] || 'components';
    if (this.currentModule === 'react') {
      this.currentModule = 'components';
    }
    const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
    if (prevModule !== this.currentModule) {
      const moduleData = getModuleData(nextProps);
      const shouldOpenKeys = Object.keys(utils.getMenuItems(moduleData, locale));
      return shouldOpenKeys;
    }
  }

  render() {
    const props = this.props;
    const localizedPageData = props.localizedPageData;
    const mainContainerClass = classNames("simpleContent");

    console.log(mainContainerClass);
    
    return (
      <div className="main-wrapper">
        <Row>
          <Col span={14} offset={5} className={mainContainerClass}>
              <Article {...props} content={localizedPageData} />
          </Col>
        </Row>
      </div>
    );
  }
}
