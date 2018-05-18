import { Modal } from 'antd';

export const SHOW_ERROR_MODAL = 'SHOW_ERROR_MODAL';
export const HIDE_ERROR_MODAL = 'HIDE_ERROR_MODAL';

function show(message) {
  return {
    type: SHOW_ERROR_MODAL,
    message,
  };
}

function hide(message) {
  return {
    type: SHOW_ERROR_MODAL,
    message,
  };
}

export function showErrorModal(error) {
  return dispatch => dispatch(show());
  return Modal.confirm({
    width: 640,
    title: '系统错误',
    content: (
      <div>
        内容编审系统出现短暂问题，请刷新页面，如有问题请联系技术人员
        {error && (
          <div
            style={{
              'overflow-y': 'auto',
              'max-height': window.innerHeight - 300,
            }}
          >
            {JSON.stringify(error)}
          </div>
        )}
      </div>
    ),
    okText: '刷新',
    onOk: () => {
      window.location.reload();
    },
    onCancel: () => {
      dispatch(hide());
    },
  });
}
