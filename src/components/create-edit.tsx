import * as React from 'react';
import { Input, Modal, Form, message } from 'antd';
// import { postHeader } from '@/utils/request';

type FormType = 'add' | 'edit'; // 新建/更新弹窗模式

interface StageItem {
  id?: number;
  name: string;
}

interface EditFormProps {
  typeModal: FormType;
  visible: boolean;
  onRefresh: () => void;
  onCancel: () => void;
  appInfo: StageItem | null;
}

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };

export default ({
  visible,
  appInfo,
  typeModal,
  onRefresh,
  onCancel,
}: EditFormProps): JSX.Element => {
  const { name, id } = appInfo || {};
  const [form] = Form.useForm();

  const onCreate = async (values: StageItem) => {
    // TODO 发送新增请求, 记得删除console
    console.log('传入参数-新增：', { ...values });

    // const res = await postHeader('/circle/add', { ...values });
    const res = { success: true };
    if (res.success) onRefresh();
  };

  const onUpdate = async (values: StageItem) => {
    // TODO 发送修改请求, 记得删除console
    console.log('传入参数-编辑：', { ...values, id });

    // const res = await postHeader('/circle/edit', { ...values, id });
    const res = { success: true };
    if (res.success) onRefresh();
  };

  return (
    <Modal
      maskClosable={false}
      visible={visible}
      title={typeModal === 'add' ? '新建圈子' : '编辑圈子'}
      okText="保存"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values: any) => {
            if (typeModal === 'add') onCreate(values);
            if (typeModal === 'edit') onUpdate(values);
          })
          .catch(() => message.error('表单校验错误,请修正后再提交'));
      }}
    >
      <Form {...layout} form={form} initialValues={{ name }}>
        <Form.Item label="名称" name="name">
          <Input style={{ width: '250px' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
