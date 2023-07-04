import React from 'react';
import {  Layout, ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppHeader,AppFooter } from './components';
import {RewardsDashboard} from "./pages"
import './App.css';

const { Content } = Layout;
function App() {

  return (
    <div className="App">
      <ConfigProvider theme={{
        token: {
          colorPrimary: "#0C0023",
          colorPrimaryBgHover: "#fb00b7",
          colorPrimaryText: "white",
          colorPrimaryBg: "white",
          colorPrimaryBorderHover: "#fb00b7",
          colorPrimaryHover: "#fb00b7",
          colorPrimaryActive: "#fb00b7",
        }
      }}>
        <Layout className="layout">
          <AppHeader /> 
          <Content style={{ minHeight: "85vh" }}>
            <div className="site-layout-content">
              <BrowserRouter>
              <Routes>
                <Route path="/" element={<RewardsDashboard />}></Route>
                <Route path="/rewards" element={<RewardsDashboard />}></Route>
                <Route path="/test2" element={<RewardsDashboard />}></Route>
                <Route path="/test3" element={<RewardsDashboard />}></Route>
              </Routes>
            </BrowserRouter>
            </div>
          </Content>
          <AppFooter />
      </Layout>
    </ConfigProvider>
    </div>
  );
}

export default App;
