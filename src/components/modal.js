import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';

export default function modal(config = {}) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  function afterClose() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function onCancel() {
    render(false);
  }

  function render(visible) {
    const props = {
      destroyOnClose: true,
      width: 800,
      footer: null,
      ...config,
      body: undefined,
      onCancel,
      afterClose,
      visible,
    };

    ReactDOM.render(<Modal {...props}>{config.body}</Modal>, div);
  }

  render(true);
}
