import { useState, useEffect, useCallback } from 'react'
import { Table, Button, Input, Space, Modal, Form, Popconfirm, message, Card } from 'antd'
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { listUsers, createUser, updateUser, deleteUser, type User, type UserQuery } from '@/api/user'
import type { ColumnsType } from 'antd/es/table'

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState<UserQuery>({ page: 1, size: 10 })
  const [keyword, setKeyword] = useState('')

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form] = Form.useForm()

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await listUsers({ ...query, keyword: keyword || undefined })
      setUsers(res.records)
      setTotal(res.total)
    } finally {
      setLoading(false)
    }
  }, [query, keyword])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSearch = () => {
    setQuery((prev) => ({ ...prev, page: 1 }))
  }

  const handleAdd = () => {
    setEditingUser(null)
    form.resetFields()
    setModalOpen(true)
  }

  const handleEdit = (record: User) => {
    setEditingUser(record)
    form.setFieldsValue(record)
    setModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    await deleteUser(id)
    message.success('删除成功')
    fetchUsers()
  }

  const handleModalOk = async () => {
    const values = await form.validateFields()
    if (editingUser) {
      await updateUser(editingUser.id, values)
      message.success('更新成功')
    } else {
      await createUser(values)
      message.success('新增成功')
    }
    setModalOpen(false)
    fetchUsers()
  }

  const columns: ColumnsType<User> = [
    { title: '序号', key: 'index', width: 80, render: (_, __, i) => (query.page - 1) * query.size + i + 1 },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '年龄', dataIndex: 'age', key: 'age', width: 80 },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm title="确定删除该用户？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Input
            placeholder="搜索姓名"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 200 }}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            搜索
          </Button>
        </Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          current: query.page,
          pageSize: query.size,
          total,
          showTotal: (t) => `共 ${t} 条`,
          onChange: (page, size) => setQuery({ page, size }),
        }}
      />

      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item name="age" label="年龄" rules={[{ required: true, message: '请输入年龄' }]}>
            <Input type="number" placeholder="请输入年龄" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
