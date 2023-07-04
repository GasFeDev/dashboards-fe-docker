import { useState, useEffect, useCallback } from "react";
import { Row, Col, Typography, Button, Space, Input, message } from "antd";
import { DataTable, Divider as DividerImage } from "../../components";
import { getRewardsByAddresses } from "../../api";
import { rewardsColumns } from "./columns";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { PoolsDashboard } from "./PoolDashboard";
import "./RewardsDashboard.css";
import { NoticeType } from "antd/es/message/interface";

export const RewardsDashboard = () => {
  const [rewardsData, setRewardsData] = useState([]);
  const [rewardsTotal, setRewardsTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [tokenFilter, setTokenFilter] = useState([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [, setSearchText] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);
  const [inputAddress, setInputAddress] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loadedFromLocalStorage, setLoadedFromLocalStorage] = useState(false);
  const [newAddressAdded, setNewAddressAdded] = useState(false);
  const key = "message";

  useEffect(() => {
    const items = localStorage.getItem("addressItems");
    if (items) {
      console.log("GOT ITEMS");
      const parsedItems = JSON.parse(items);
      setAddresses(parsedItems);
      setLoadedFromLocalStorage(true);
    } else {
      setLoadedFromLocalStorage(false);
    }
  }, []);

  useEffect(() => {
    if (loadedFromLocalStorage || newAddressAdded) {
      getRewardsData();
      setNewAddressAdded(false);
    }
  }, [loadedFromLocalStorage, addresses, newAddressAdded]);

  useEffect(() => {
    if (loadedFromLocalStorage) {
      localStorage.setItem("addressItems", JSON.stringify(addresses));
    }
  }, [addresses, loadedFromLocalStorage]);

  const getRewardsData = async () => {
    setLoading(true);
    try {
      const results = await getRewardsByAddresses({
        addresses: addresses,
        skip: offset,
        limit: limit,
      });

      setRewardsData(results.result);
      setRewardsTotal(results.total);

      if (results?.result?.length === 0 && addresses.length > 0) {
        openMessage("Didn't find rewards for the specified address", "info");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setRewardsTotal(0);
      openMessage(
        "Error trying to get information, please try again later.",
        "error"
      );
    }
  };

  const handleChange = (
    pagination: any,
    filters: any,
    sorter: { hasOwnProperty: (arg0: string) => any; field: any; order: any }
  ) => {
    const offset =
      pagination.current * pagination.pageSize - pagination.pageSize;
    const limit = pagination.pageSize;

    //apply filters
    // setTokenFilter(filters.token);
    setOffset(offset);
    setLimit(limit);
  };

  const onSearch = (value: string) => {
    setSearchText(value);
    setAddresses([value]);
  };

  const clearItemsFromLocalStorage = () => {
    localStorage.removeItem("addressItems");
    setAddresses([]);
    openMessage("Cleared addresses", "info");
    setNewAddressAdded(true);
  };

  const debouncedChangeHandler = useCallback(debounce(onSearch, 600), []);

  const handleAddAddress = () => {
    if (inputAddress && !addresses.includes(inputAddress)) {
      const updatedAddresses = [...addresses, inputAddress];
      setAddresses(updatedAddresses);
      setInputAddress("");
      localStorage.setItem("addressItems", JSON.stringify(updatedAddresses));
      openMessage("Address added successfully!", "success");
      setNewAddressAdded(true);
    }
  };

  const openMessage = (message: string, type: NoticeType) => {
    messageApi.open({
      key,
      type: type,
      content: message,
      duration: 2,
    });
  };

  return (
    <div className="rewards-container">
      {contextHolder}
      <Row justify="center" align="top">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Typography.Title
            level={1}
            className="white-text"
            style={{ color: "#fff" }}
          >
            Rewards Dashboard
          </Typography.Title>
          <Typography.Paragraph className="white-text">
            Track your DEGA Token rewards per address.
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row justify="start" align="middle" style={{ marginTop: "2rem" }}>
        <Col
          xs={24}
          sm={24}
          md={16}
          lg={8}
          xl={8}
          className="control-addresses custom-input"
        >
          <Input
            placeholder="Enter an address"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            style={{ maxWidth: 450 }}
            className="address-input"
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={4}
          xl={3}
          className="control-addresses custom-input"
        >
          <Button
            type="primary"
            onClick={handleAddAddress}
            className="addresses-button "
          >
            Add Address
          </Button>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={6}
          lg={12}
          xl={8}
          className="control-addresses"
        >
          <Button
            type="primary"
            onClick={clearItemsFromLocalStorage}
            className="addresses-button "
          >
            Clear Addresses
          </Button>
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Space direction="vertical" size={16} />
          <DataTable
            dataSource={rewardsData}
            columns={rewardsColumns}
            loading={loading}
            total={rewardsTotal}
            onChange={handleChange}
            showTitleComponent={false}
            rowKey={"address"}
            TitleComponent={
              <Input
                size="large"
                className="search-input"
                placeholder="Search..."
                onChange={(e) => debouncedChangeHandler(e.target.value)}
                suffix={<SearchOutlined />}
              />
            }
          />
        </Col>
        <DividerImage />
      </Row>
      <PoolsDashboard />
    </div>
  );
};
