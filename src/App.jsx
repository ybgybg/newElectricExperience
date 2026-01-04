import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Card, Row, Col, Typography, Button, Space } from 'antd'
import { ThunderboltOutlined, InteractionOutlined, DotChartOutlined, DeploymentUnitOutlined } from '@ant-design/icons'

// 引入你原来的计算器组件（稍后我们把计算器代码搬到这个文件）
import ElectricLoaderTCO from './pages/ElectricLoaderTCO'

const { Title, Text } = Typography;

// --- 首页组件 ---
function HomePage() {
  const navigate = useNavigate();

  const menuItems = [
    { title: "电动装载机 TCO 分析", icon: <ThunderboltOutlined />, path: "/loader-tco", active: true },
    { title: "燃油 vs 电动装载机", icon: <InteractionOutlined />, path: "/compare-loader", active: false },
    { title: "电动挖掘机 TCO 分析", icon: <DotChartOutlined />, path: "/excavator-tco", active: false },
    { title: "燃油 vs 电动挖掘机", icon: <DeploymentUnitOutlined />, path: "/compare-excavator", active: false },
  ];

  return (
    <div style={{ padding: '40px', background: '#f0f2f5', minHeight: '100vh', width: '100vw',margin: 0,boxSizing: 'border-box', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <Title level={1} style={{ marginBottom: '40px' }}>越来越多客户选择电动产品......</Title>
        <Row gutter={[24, 24]}>
          {menuItems.map((item, index) => (
            <Col xs={24} sm={12} key={index}>
              <Card 
                hoverable 
                style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => item.active && navigate(item.path)}
              >
                <Space direction="vertical" align="center">
                  <div style={{ fontSize: '32px', color: item.active ? '#1677ff' : '#bfbfbf' }}>{item.icon}</div>
                  <Text strong style={{ fontSize: '16px', color: item.active ? 'rgba(0,0,0,0.85)' : '#bfbfbf' }}>
                    {item.title}
                  </Text>
                  {!item.active && <Text type="secondary" size="small">(开发中)</Text>}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

// --- 总入口 App 组件 ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loader-tco" element={<ElectricLoaderTCO />} />
        {/* 以后新增的页面在这里加 Route 即可 */}
      </Routes>
    </Router>
  );
}

export default App;