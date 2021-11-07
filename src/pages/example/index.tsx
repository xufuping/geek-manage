// import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, message, Table } from 'antd';
// import { get } from '@/utils/request'; // get请求
import CreateEdit from '@/components/create-edit'; // 增改弹窗
import { mockData } from '@/mock/mock';

type FormType = 'add' | 'edit';

interface StageItem {
  id?: number;
  name: string;
}

export default (): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [formType, setFormType] = useState<FormType>('add');
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [appInfo, setAppInfo] = useState<StageItem | null>(null);

  const [paging, setPaging] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 1, pageSize: 10 });

  // 列表表头
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '名称', dataIndex: 'name' },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (_txt: any, _record: any) => (
        <Button type="link" onClick={() => onUpdate(_record)}>
          编辑
        </Button>
      ),
    },
  ];

  const onPage = (pageNum?: number, pageSize?: number) => {
    setPaging({ page: pageNum || 1, pageSize: pageSize || 10 });

    // TODO 发送获取数据请求
    // get('/circle/queryList', {
    //   pageNo: pageNum || 1,
    //   pageSize: pageSize || 10,
    // })
    // TODO 这里暂时写any，业务开发使用type定义类型
    new Promise<any>((resolve) => {
      resolve(mockData);
    }).then((res) => {
      if (res.success && res.data) {
        setDataSource(res.data.dataList || []);
        setTotalCount(res.data.total || 0);
      } else {
        message.error('获取圈子列表失败');
      }
    });
  };

  // 新增
  const onAdd = () => {
    setFormType('add');
    setAppInfo(null);
    setVisible(true);
  };

  // 编辑
  const onUpdate = (data: StageItem) => {
    setFormType('edit');
    setAppInfo(data);
    setVisible(true);
  };

  useEffect(() => onPage(), []);

  return (
    <>
      <Button type="primary" onClick={() => onAdd()} style={{ width: 150}}>
        创建新的数据项
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: paging.pageSize,
          total: totalCount,
          current: paging.page,
          onChange: (pageNum, pageSize) => onPage(pageNum, pageSize),
        }}
      />

      {/* 增改弹窗 */}
      {visible && (
        <CreateEdit
          typeModal={formType}
          visible={visible}
          appInfo={appInfo}
          onRefresh={() => {
            onPage(paging.page, paging.pageSize); // 不跳转页面的获取页面数据
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
        />
      )}
    </>
  );
};
