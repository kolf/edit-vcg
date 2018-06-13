import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Spin, Modal, message, Divider } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SearchInput from 'components/SearchInput';
import FilterTag from 'components/FilterTag';
import FetchPlaceholder from 'components/FetchPlaceholder';
import GroupItem from './components/GroupItem';
import s from './SearchGroup.css';

import {
  fetchSearchGroups,
  publishSearchGroups,
  setSearchGroups,
} from 'actions/searchGroups';
import { fetchKeywordDict } from 'actions/keywordDict';

import TagModal from './components/TagModal';
import TagGroup from './components/TagGroup';
import GroupList from './components/GroupList';
const _ = require('lodash');

const confirm = Modal.confirm;

class SearchGroup extends React.Component {
  static propTypes = {
    groups: PropTypes.array,
  };

  static defaultProps = {
    groups: [],
  };

  state = {
    tagModalVisible: false,
    groupIds: '',
  };

  gruopSearch = null;
  groupSearchModalValue = null;

  componentWillUnmount() {
    this.props.dispatch(setSearchGroups([]));
  }

  loadGroups = groupIds => {
    this.props.dispatch(fetchSearchGroups(groupIds)).then(groups => {
      const keywordIds = groups.reduce((result, group) => {
        const { searchItems } = group;
        if (searchItems) {
          searchItems.forEach(search => {
            const { keywords, children } = search;
            if (keywords) {
              result.push(...(keywords.match(/\d+/g) || []));
            }
            if (children) {
              children.forEach(c => {
                const { keywords } = c;
                if (keywords) {
                  result.push(...(keywords.match(/\d+/g) || []));
                }
              });
            }
          });
        }
        return result;
      }, []);

      this.fetchKeywordDict(keywordIds);
    });
  };

  fetchKeywordDict = (ids = []) => {
    this.props.dispatch(
      fetchKeywordDict({
        data: _.uniq(ids).toString(),
      }),
    );
  };

  pushlishSearchGroup = () => {
    const params = this.props.groups.map(group => {
      const { id, searchItems } = group;
      const searchItemList = searchItems.map(item => {
        const { id, children } = item;
        return {
          pid: id,
          children: children ? children.map(c => c.id).join(',') : undefined,
        };
      });

      return {
        groupId: id,
        searchItemList,
      };
    });

    publishSearchGroups(params)
      .then(msg => message.success('发布成功！'))
      .catch(err => message.error('发布错误，请稍候再试！'));
  };

  handleFilterTagClick = groupSearch => {
    this.groupSearchModalValue = JSON.parse(groupSearch);
    this.setState({
      tagModalVisible: true,
    });
  };

  hideTagModal = () => {
    this.setState({
      tagModalVisible: false,
    });
  };

  handleInputChange = value => {
    const groupIds = value.replace(/[^\d,，]+/g, '');
    this.setState({
      groupIds,
    });
  };

  handleInputClick = () => {
    const groupIds = this.state.groupIds.match(/\d+/g);
    if (groupIds) {
      this.loadGroups(groupIds.join(','));
    } else {
      this.props.dispatch(setSearchGroups([]));
    }
  };

  handleGroupClick = (groupId, e) => {
    e.stopPropagation();
    const groups = this.props.groups.map(group => {
      if (group.id == groupId) {
        group.selected = !group.selected;
        this.gruopSearch = group.searchItems;
      } else {
        group.selected = false;
      }
      return group;
    });
    this.props.dispatch(setSearchGroups(groups));
  };

  setAllGroupSearch = () => {
    const groupSearch = this.groupSearchModalValue;

    console.log(_.cloneDeep(groupSearch));

    const groups = this.props.groups.map(group => {
      group.searchItems = _.cloneDeep(groupSearch);
      return group;
    });
    this.hideTagModal();
    this.props.dispatch(setSearchGroups(groups));
  };

  deleleGroup = (groupId, e) => {
    e.stopPropagation();
    const groups = this.props.groups.filter(group => group.id != groupId);
    const groupIds = this.state.groupIds
      .replace(groupId, '')
      .match(/\d+/g)
      .toString();

    this.setState({ groupIds });
    this.props.dispatch(setSearchGroups(groups));
  };

  render() {
    const { groups, isFetching, errMessage, groupsKey } = this.props;
    let { tagModalVisible, groupIds } = this.state;

    return (
      <div className={s.root}>
        <TagModal
          visible={tagModalVisible}
          groupSearchs={this.groupSearchModalValue}
          onCancel={this.hideTagModal}
          onOk={this.setAllGroupSearch}
        />

        <SearchInput
          value={groupIds}
          style={{ width: 800 }}
          placeholder="输入组ID进行搜索, 多个组ID用逗号隔开"
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
        />

        <div className={s.filterTagWrap}>
          <FilterTag
            pageId="201"
            value={this.gruopSearch}
            title="模版"
            onClick={this.handleFilterTagClick}
          />
        </div>

        <div className={s.padB8}>
          <Button
            type="primary"
            disabled={groups.length === 0 || isFetching}
            onClick={this.pushlishSearchGroup}
          >
            批量发布
          </Button>
        </div>

        {groups.length > 0 ? (
          <div>
            {groups.map(item => (
              <GroupItem
                onClick={e => this.handleGroupClick(item.id, e)}
                onDelete={e => this.deleleGroup(item.id, e)}
                key={item.key}
                {...item}
              />
            ))}
          </div>
        ) : (
          <FetchPlaceholder
            text={errMessage || '请输入组ID查询组照~'}
            loading={isFetching}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.searchGroups.list,
    isFetching: state.searchGroups.isFetching,
    errMessage: state.searchGroups.errMessage,
  };
}

export default withStyles(s)(connect(mapStateToProps)(SearchGroup));
