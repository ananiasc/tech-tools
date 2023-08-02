import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from "react-router-dom";
import ContentBody from './assets/pages/content/ContentBody';
import Logo from '/logo-sf.png?url';
import { useEffect, useState } from 'react';

const { Header, Sider, Content, Footer } = Layout;
const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Início", "/", <HomeOutlined />),
  getItem("Conversão", "conversao", <SettingOutlined />, [
    getItem("Conversor de Texto", "/convert-text", null),
  ]),
  getItem("Gerador", "gerador", <SettingOutlined />, [
    getItem("Gerador de Senha", "/generate-key", null),
    getItem("Gerador de CPF", "/generate-cpf", null),
    getItem("Gerador de CNPJ", "/generate-cnpj", null),
  ]),
];

function App() {
  const navigate = useNavigate();
  const [widthSize, setWidthSize] = useState(window.innerWidth);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidthSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setCollapsed(widthSize > 740 ? false : true);
  }, [widthSize]);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          border: '1px solid rgba(0,0,0, 0.2)',
          borderTop: '0px',
          borderRadius: '0 0 20px 20px'
        }}
      >
        <div className="logo">
          <img src={Logo} alt="logo: tech tools" 
            style={{
              width: '75px',
              background: 'rgba(255, 255, 255, 0.2)',
              margin: '16px 24px 16px 0',
              float: 'left',
            }} />
        </div>
        <Menu theme="light" mode="horizontal" />
      </Header>
      <Content>
        <Layout
          style={{
            background: colorBgContainer,
          }}
        >
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
            collapsed={collapsed}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['/']}
              defaultOpenKeys={['/']}
              onClick={({key}) => { navigate(key) }}
              items={items}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <ContentBody />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by Ananias C. ©2023</Footer>
    </Layout>
  );
}

export default App;