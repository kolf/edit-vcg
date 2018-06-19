import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Button, Icon, Upload, message } from 'antd';
import LayoutMask from 'components/LayoutMask';
import { fetchTopic, setTopic, deteleTopicBanner } from 'actions/topic';

const Search = Input.Search;
const ButtonGroup = Button.Group;

import s from './Navbar.less';
import logoUrl from '../assets/logo.svg';

class Navbar extends React.Component {
  static defaultProps = {
    title: '加载中...',
  };

  componentDidMount() {
    this.props.dispatch(fetchTopic({ id: this.props.topicId }));
  }

  changeBanner = url => {
    this.props.dispatch(
      setTopic({
        bannerUrl: url,
      }),
    );
  };

  deteleTopicBanner = e => {
    const { topicId } = this.props;
    deteleTopicBanner({ topicId }).then(msg => {
      this.changeBanner('');
    });
  };

  // setTopic
  render() {
    const { moduleChange, topicId, title, bannerUrl, bannerKey } = this.props;

    console.log(bannerUrl)

    const uploadProps = {
      supportServerRender: true,
      name: 'file',
      showUploadList: false,
      accept: 'image/png,image/jpeg,image/jpg',
      action: '/api/sitecms/topicPageSet/uploadBannerImage',
      data: {
        topicId,
      },
      beforeUpload: file => {
        const isJPG = /[jpeg|png]/.test(file.type);
        if (!isJPG) {
          message.error('只能上传 JPG/PNG 文件！');
        }
        return isJPG;
      },
      onChange: info => {
        if (info.file.status === 'done') {
          const res = info.file.response;
          if (res && res.code === 200 && res.data) {
            message.success('banner上传成功');
            let bannerUrl = `${res.data}?now=${Date.now()}`;
            this.changeBanner(bannerUrl);
          } else {
            message.error(res.message);
          }
        } else if (info.file.status === 'error') {
          message.error('上传失败，请重新尝试！');
        }
      },
    };

    return (
      <div
        className={s.root}
        style={bannerUrl ? { backgroundImage: 'url(' + bannerUrl + ')' } : null}
      >
        <div className={s.header}>
          <LayoutMask
            style={{
              display: 'inline-block',
              paddingRight: 60,
              paddingTop: 10,
            }}
            target="logo"
            onChange={moduleChange}
          >
            <a className={s.logo}>
              <img key={bannerKey} src={logoUrl} width="100" alt="视觉中国" />
            </a>
          </LayoutMask>
          <h1 className={s.title}>
            <LayoutMask
              style={{
                display: 'inline-block',
                paddingRight: 60,
                paddingTop: 10,
              }}
              target="title"
              onChange={moduleChange}
            >
              {title}
            </LayoutMask>
          </h1>
          <div className={s.search}>
            <Search
              placeholder="专题内搜索"
              onSearch={value => console.log(value)}
              enterButton
            />
          </div>
        </div>
        <div className={s.btns}>
          <span className={s.uploadText}>尺寸1200*120</span>
          {bannerUrl ? (
            <ButtonGroup size="small">
              <Upload {...uploadProps}>
                <Button size="small" type="primary">
                  重新上传
                </Button>
              </Upload>
              <Button onClick={this.deteleTopicBanner}>删除</Button>
            </ButtonGroup>
          ) : (
            <Upload {...uploadProps}>
              <Button size="small" type="primary" icon="file-add">
                上传banner
              </Button>
            </Upload>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.topic.title,
    bannerUrl: state.topic.bannerUrl,
  };
}

export default withStyles(s)(connect(mapStateToProps)(Navbar));
