import { useState } from 'react'
import { machineData, labelMap } from "../data"
import { calculateTCO } from "../TCOCalculator"
import { Card, Row, Col, Select, InputNumber, Typography, Button, Space, Divider, Statistic } from 'antd'
import { DownloadOutlined, CalculatorOutlined, SettingOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useNavigate } from 'react-router-dom'



const { Title, Text } = Typography;

function ElectricLoaderTCO() {
  const navigate = useNavigate();
  const [selectedMachine, setSelectedMachine] = useState("L956HEV");
  const [params, setParams] = useState(machineData["L956HEV"]);

  const results = calculateTCO(params);

  const handleMachineChange = (value) => {
    setSelectedMachine(value);
    setParams(machineData[value]);
  };

  const exportPDF = async () => {
  const element = document.querySelector('#report-area');
  const paramList = document.querySelector('#param-list'); // 获取滚动区域

  // --- [关键步骤 A]: 截图前准备 ---
  // 1. 临时保存原来的样式
  const originalMaxHeight = paramList.style.maxHeight;
  const originalOverflow = paramList.style.overflowY;

  // 2. 展开所有内容：取消高度限制，让内容全部显示出来
  paramList.style.maxHeight = 'none';
  paramList.style.overflowY = 'visible';

  // --- [关键步骤 B]: 执行截图 ---
  try {
    const canvas = await html2canvas(element, { 
      scale: 2,
      useCORS: true, // 解决跨域图片问题
      windowHeight: element.scrollHeight // 确保获取完整高度
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.8);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // 计算图片在 PDF 中的比例（防止变形）
    const imgWidth = 190;
    //const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
    pdf.save(`TCO_Report_${selectedMachine}.pdf`);
  } catch (error) {
    console.error("导出失败:", error);
  } finally {
    // --- [关键步骤 C]: 截图后还原 ---
    // 无论成功还是失败，都要把网页样式变回原来的样子，否则用户会发现滚动条没了
    paramList.style.maxHeight = originalMaxHeight;
    paramList.style.overflowY = originalOverflow;
  }
};

  return (
    <div style={{ padding: '40px', background: '#f0f2f5', minHeight: '100vh',width: '100vw',margin: 0,boxSizing: 'border-box'}}>
      <div id="report-area" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <Row gutter={[24, 24]} align="middle" style={{ marginBottom: '20px' }}>
          <Col span={18}>
            <Space size="middle">
              {/* 返回按钮 */}
              <Button 
                onClick={() => navigate('/')} 
                icon={<ArrowLeftOutlined />} // 需要从 @ant-design/icons 引入
              >
                返回
              </Button>
              <Title level={2} style={{ margin: 0 }}>
                <CalculatorOutlined /> 电动装载机 TCO 决策分析系统
              </Title>
            </Space>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button type="primary" icon={<DownloadOutlined />} size="large" onClick={exportPDF}>
              导出分析报告
            </Button>
          </Col>
        </Row>

        <Row gutter={24}>
          {/* 左侧控制面板 */}
          <Col span={8}>
            <Card title={<span><SettingOutlined /> 参数设置</span>} bordered={false}>
              <Text type="secondary">选择设备型号</Text>
              <Select 
                style={{ width: '100%', marginTop: '8px', marginBottom: '20px' }} 
                value={selectedMachine} 
                onChange={handleMachineChange}
                options={Object.keys(machineData).map(m => ({ label: m, value: m }))}
              />
              
              <Divider>核心成本因子</Divider>
              
              <div id="param-list" style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                {Object.keys(params).map(key => (
                  <div key={key} style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{labelMap[key] || key}</div>
                    <InputNumber 
                      style={{ width: '100%' }} 
                      value={params[key]} 
                      onChange={(val) => setParams(prev => ({ ...prev, [key]: val }))}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* 右侧结果面板 */}
          <Col span={16}>
            <Card title="成本效益分析结果" bordered={false}>
              <Row gutter={16}>
                <Col span={12}>
                  <Card hoverable style={{ background: '#1677ff', borderRadius: '8px' }}>
                    <Statistic 
                      title={<span style={{color: '#fff'}}>总 TCO (每小时)</span>}
                      value={results.TCO}
                      precision={2}
                      valueStyle={{ color: '#fff', fontSize: '32px' }}
                      suffix="元"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card hoverable style={{ borderRadius: '8px' }}>
                    <Statistic 
                      title="折旧成本"
                      value={results.depreciation}
                      precision={2}
                      valueStyle={{ color: '#cf1322' }}
                      suffix="元/小时"
                    />
                  </Card>
                </Col>
              </Row>

              <Divider />

              <Row gutter={[16, 24]}>
                <Col span={8}>
                  <Statistic title="能源成本" value={results.electricity} precision={2} suffix="元/小时" />
                </Col>
                <Col span={8}>
                  <Statistic title="维保费用" value={results.maintenance} precision={2} suffix="元/小时" />
                </Col>
                <Col span={8}>
                  <Statistic title="人工成本" value={results.driver} precision={2} suffix="元/小时" />
                </Col>
                <Col span={8}>
                  <Statistic title="保险费用" value={results.insurance} precision={2} suffix="元/小时" />
                </Col>
                <Col span={8}>
                  <Statistic title="税费" value={results.tax} precision={2} suffix="元/小时" />
                </Col>
              </Row>
            </Card>
            
            <Card title="注意事项" style={{ marginTop: '24px' }}>
              <Text type="secondary">
                * 轮胎/履带费用（元）：设备交付时所配置轮胎或履带的一次性成本。
                <br />
                * 行走系统费用（元/万小时）：设备使用过程中，行走系统的维修、更换等后期维护成本。
              </Text>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ElectricLoaderTCO