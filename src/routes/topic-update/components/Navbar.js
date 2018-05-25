import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Button, Icon, Upload, message } from 'antd';
import LayoutMask from 'components/LayoutMask';

const Search = Input.Search;
const ButtonGroup = Button.Group;

import s from './Navbar.less';
import logoUrl from '../assets/logo.svg';

class Navbar extends React.Component {
  state = {
    bannerUrl: '',
  };

  handleRemove = () => {
    this.setState({
      bannerUrl: '',
    });
  };

  render() {
    const { toggleLayerChange, topicId } = this.props;
    let { bannerUrl } = this.state;

    const uploadProps = {
      supportServerRender: true,
      name: 'file',
      showUploadList: false,
      accept: 'image/png,image/jpeg,image/jpg',
      action: '/api/xuefeng/topicPageSet/uploadBannerImage',
      data: {
        topicId
      },
      beforeUpload: file => {
        const isJPG = /[jpeg|png]/.test(file.type);
        if (!isJPG) {
          message.error('只能上传 JPG/PNG 文件！');
        }
        return isJPG;
      },
      onChange: info => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
          const res = info.file.response;
          if (res && res.code === 200 && res.data) {
            message.success('banner上传成功');
            this.setState({
              bannerUrl: `${res.data}?now=${Date.now()}`,
            });
          } else {
            message.error(res.message);
          }
          console.log(info.file, info.fileList);
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
            onChange={toggleLayerChange}
          >
            <a className={s.logo}>
              <img src={logoUrl} width="100" alt="视觉中国" />
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
              onChange={toggleLayerChange}
            >
              2018俄罗斯世界杯
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
              <Button onClick={this.handleRemove}>删除</Button>
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

export default withStyles(s)(Navbar);
