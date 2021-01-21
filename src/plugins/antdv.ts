import { Button, Layout, Menu, Spin } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

export function setupAntdv(app: any) {
  app.use(Button)
  app.use(Layout)
  app.use(Menu)
  app.use(Spin)
}
