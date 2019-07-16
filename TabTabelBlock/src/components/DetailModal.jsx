import React from 'react'
import { connect } from 'dva';
import { Modal } from 'antd'
@connect(
    ({ PAGE_NAME_UPPER_CAMEL_CASEModel }) => ({
        ...PAGE_NAME_UPPER_CAMEL_CASEModel
    }))
class PAGE_NAME_UPPER_CAMEL_CASEDetailModal extends React.Component {
    closeDetailModal = () => {
        this.props.dispatch({
            type: 'PAGE_NAME_UPPER_CAMEL_CASEModel/save',
            payload: {
                PAGE_NAME_UPPER_CAMEL_CASEDetailModalVisible: false,
            },
        });
    }

    render() {
        let { PAGE_NAME_UPPER_CAMEL_CASEDetailModalVisible, currentEditItem } = this.props;
        return <Modal
            width="60%"
            onCancel={this.closeDetailModal}
            footer={null}
            visible={PAGE_NAME_UPPER_CAMEL_CASEDetailModalVisible}
            title={'详情'}
        >
            <div>
                id: {currentEditItem.id}
                name: {currentEditItem.name}
            </div>
        </Modal>
    }
}

export default PAGE_NAME_UPPER_CAMEL_CASEDetailModal;
