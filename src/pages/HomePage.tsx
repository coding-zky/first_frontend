import { Card, Typography } from 'antd'

const { Title, Paragraph } = Typography

export default function HomePage() {
  return (
    <Card>
      <Title level={2}>欢迎使用全栈开发脚手架</Title>
      <Paragraph>
        这是一个基于 SpringBoot + React 的全栈项目脚手架，
        集成了统一响应、异常处理、跨域配置、参数校验、Swagger 文档等开箱即用的功能。
      </Paragraph>
      <Paragraph>
        点击左侧菜单「用户管理」查看 CRUD 示例，体验前后端联调。
      </Paragraph>
    </Card>
  )
}
