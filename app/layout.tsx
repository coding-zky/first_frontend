import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, App as AntApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import AppLayout from '@/components/AppLayout'
import './globals.css'

export const metadata = {
  title: '全栈开发脚手架',
  description: '基于 SpringBoot + Next.js 的全栈项目脚手架',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <AntdRegistry>
          <ConfigProvider locale={zhCN}>
            <AntApp>
              <AppLayout>{children}</AppLayout>
            </AntApp>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
