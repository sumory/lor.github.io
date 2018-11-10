import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import Parallax from 'rc-scroll-anim/lib/ScrollParallax';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const TweenOneGroup = TweenOne.TweenOneGroup;
const featuresCN = [
  {
    title: '高性能',
    content: '运行在OpenResty上， 可充分使用Nginx/OpenResty的库和插件',
    color: '#13C2C2',
    shadowColor: 'rgba(19,194,194,.12)',
  },
  {
    title: '易开发',
    content: '使用Lua作为主要编码语言， 开发效率可媲美PHP等传统Web开发语言',
    color: '#2F54EB',
    shadowColor: 'rgba(47,84,235,.12)',
  },
  {
    title: '低门槛',
    content: '采用简单易用的Sinatra风格路由， 并提供丰富的中间件功能v',
    color: '#F5222D',
    shadowColor: 'rgba(245,34,45,.12)',
  }
];

var featuresEN = featuresCN;

const pointPos = [
  { x: -30, y: -10 },
  { x: 20, y: -20 },
  { x: -65, y: 15 },
  { x: -45, y: 80 },
  { x: 35, y: 5 },
  { x: 50, y: 50, opacity: 0.2 },
];

class Page1 extends React.PureComponent {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      hoverNum: null,
    };
  }
  onMouseOver = i => {
    this.setState({
      hoverNum: i,
    });
  };
  onMouseOut = () => {
    this.setState({
      hoverNum: null,
    });
  };
  getEnter = e => {
    const i = e.index;
    const r = Math.random() * 2 - 1;
    const y = Math.random() * 10 + 5;
    const delay = Math.round(Math.random() * (i * 50));
    return [
      { delay, opacity: 0.4, ...pointPos[e.index], ease: 'easeOutBack', duration: 300 },
      {
        y: r > 0 ? `+=${y}` : `-=${y}`,
        duration: Math.random() * 1000 + 2000,
        yoyo: true,
        repeat: -1,
      },
    ];
  };
  render() {
    const { hoverNum } = this.state;
    const { intl } = this.props;
    let children = [[]];
    (intl.locale === 'zh-CN' ? featuresCN : featuresEN).forEach((item, i) => {
      const isHover = hoverNum === i;
      const pointChild = [
        'point-0 left',
        'point-0 right',
        'point-ring',
        'point-1',
        'point-2',
        'point-3',
      ].map(className => (
        <TweenOne
          component="i"
          className={className}
          key={className}
          style={{
            background: item.color,
            borderColor: item.color,
          }}
        />
      ));
      const child = (
        <li key={i.toString()}>
          <div
            className="page1-box"
            onMouseEnter={() => {
              this.onMouseOver(i);
            }}
            onMouseLeave={this.onMouseOut}
          >
            <TweenOneGroup
              className="page1-point-wrapper"
              enter={this.getEnter}
              leave={{ x: 0, y: 30, opacity: 0, duration: 300, ease: 'easeInBack' }}
              resetStyleBool={false}
            >
              {(this.props.isMobile || isHover) && pointChild}
            </TweenOneGroup>
            
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        </li>
      );
      children[0].push(child);
    });

    children = children.map((item, i) => (
      <QueueAnim
        className="page1-box-wrapper"
        key={i.toString()}
        type="bottom"
        leaveReverse
        delay={[i * 100, (children.length - 1 - i) * 100]}
        component="ul"
      >
        {item}
      </QueueAnim>
    ));
    return (
      <div className="home-page page1">
        <div className="home-page-wrapper" id="page1-wrapper">
          {!this.props.isMobile && (
            <Parallax
              className="page1-bg"
              animation={{ translateY: 200, ease: 'linear', playScale: [0, 1.65] }}
              location="page1-wrapper"
            >
              Feature
            </Parallax>
          )}
          <h2>
           <span></span> 框架特性{' '}
          </h2>
          <div className="title-line-wrapper page1-line">
            <div className="title-line" />
          </div>
          <OverPack>{children}</OverPack>
        </div>
      </div>
    );
  }
}

export default injectIntl(Page1);
