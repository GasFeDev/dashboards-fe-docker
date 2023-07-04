import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Space,
  Dropdown,
  Button,
  MenuProps,
  Tooltip,
  Divider,
  Typography,
} from "antd";
import { DataTable } from "../../components";
import { getGraphsByPools, getRewardsByPools } from "../../api";
import { rewardsPoolsColumns } from "./columns";
import { DownOutlined } from "@ant-design/icons";
import { NETWORKS } from "../../constants";
import "./PoolDashboard.css";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const items: MenuProps["items"] = NETWORKS.map((network, index) => ({
  key: index,
  label: network,
}));

export const PoolsDashboard = () => {
  const [rewardsPoolsData, setRewardsPoolsData] = useState([]);
  const [rewardsPoolTotal, setRewardsPoolsTotal] = useState(0);
  const [graphsData, setGraphsData] = useState([]);
  const [network, setNetwork] = useState(NETWORKS[1]);
  const [loading, setLoading] = useState(false);
  const [loadingPools, setLoadingPools] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    getPoolsData();
  }, [network]);

  useEffect(() => {
    getGraphData();
  }, [network]);

  const getPoolsData = async () => {
    setLoadingPools(true);
    try {
      const results = await getRewardsByPools({
        network: network,
        skip: offset,
        limit: limit,
      });

      setRewardsPoolsData(results.result);
      setRewardsPoolsTotal(results.total);
      setLoadingPools(false);
    } catch (e) {
      console.log(e);
      setLoadingPools(false);
    }
  };

  const getGraphData = async () => {
    setLoading(true);
    try {
      const results = await getGraphsByPools(network);

      setGraphsData(results.result);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleMenuClick: MenuProps["onClick"] = (e: any) => {
    const network = NETWORKS[e.key];
    setNetwork(network);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleChange = (pagination: any) => {
    const offset =
      pagination.current * pagination.pageSize - pagination.pageSize;
    const limit = pagination.pageSize;

    setOffset(offset);
    setLimit(limit);
  };

  return (
    <div className="rewards-container">
      <Row justify="center" align="top">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography.Title
            level={1}
            className="white-text"
            style={{ color: "#fff" }}
          ></Typography.Title>
          <Typography.Paragraph className="white-text"></Typography.Paragraph>
        </Col>
      </Row>
      {/* <Row justify="center" align="top">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                {network}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>
        <Divider />
  </Row>*/}
      <Row justify="center" align="top" style={{ marginTop: "3rem" }}>
        {graphsData &&
          graphsData.map((graph: any, index) => {
            if (graph.records.length > 0) {
              const { grid, startColor, stopColor } = chartColor(graph.type);
              const totalFormated = formatter
                .format(graph.total)
                .replace("$", "");

              return (
                <Col
                  xs={24}
                  sm={24}
                  md={20}
                  lg={11}
                  xl={7}
                  key={index}
                  style={{
                    textAlign: "center",
                    marginRight: "4%",
                    marginBottom: "4rem",
                    width: "110%",
                    height: "250px",
                  }}
                >
                  <>
                    <Typography.Title
                      level={4}
                      className="white-text"
                      style={{ color: "#fff" }}
                    >
                      {graph.title}
                      <p style={{ color: "#fb00b7" }}>{totalFormated}</p>
                    </Typography.Title>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        title={graph.title}
                        data={graph.records}
                        //  margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id={`colorUv_${index}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={startColor}
                              stopOpacity={0.1}
                            />
                            <stop
                              offset="95%"
                              stopColor={stopColor}
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="x"
                          dy={5}
                          axisLine={{
                            stroke: "#fff",
                            opacity: 0.75,
                          }}
                          tick={{
                            fill: "#fff",
                            opacity: 0.75,
                          }}
                          tickLine={{
                            stroke: "#fff",
                            opacity: 0.75,
                          }}
                        />
                        <YAxis
                          dataKey="y"
                          tickFormatter={(value) =>
                            formatter.format(value).replace("$", "")
                          }
                          dx={-5}
                          dy={-2}
                          axisLine={{
                            stroke: "#fff",
                            opacity: 0.75,
                          }}
                          tick={{
                            fill: "#fff",
                            opacity: 0.75,
                          }}
                          tickLine={{
                            stroke: "#fff",
                            opacity: 0.75,
                          }}
                        />
                        <Tooltip />
                        <CartesianGrid vertical={false} stroke="#DDD" />
                        <Line
                          type="monotone"
                          dataKey="y"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="y"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill={`url(#colorUv_${index})`}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </>
                </Col>
              );
            }
          })}
      </Row>
      <Row justify="center" align="top" style={{ marginTop: "2rem" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <DataTable
            dataSource={rewardsPoolsData}
            columns={rewardsPoolsColumns}
            loading={loadingPools}
            total={rewardsPoolTotal}
            onChange={handleChange}
            rowKey={"validator"}
          />
        </Col>
      </Row>
    </div>
  );
};

const chartColor = (type: string) => {
  if (type === "staked") {
    return {
      grid: "red",
      startColor: "blue",
      stopColor: "#fff",
    };
  }

  if (type === "reward") {
    return {
      grid: "green",
      startColor: "red",
      stopColor: "red",
    };
  }

  if (type === "participants") {
    return {
      grid: "#c00182",
      startColor: "#129a74",
      stopColor: "#fff",
    };
  }

  return {
    grid: "",
    startColor: "#129a74",
    stopColor: "#fff",
  };
};
