
import { ColumnsType } from "antd/es/table";

export interface RewardsDataType {
    key: string;
    adress: string;
    token: string;
    reward: number;
    processDate: string;
    totalNativeReward: string;
    totalDegaReward: string;
}

export const rewardsColumns: ColumnsType<RewardsDataType> = [
    {
        title: "ADDRESS",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "TOKEN",
        dataIndex: "token",
        key: "token",
    },
    {
        title: "LIVE STAKE",
        dataIndex: "liveStaked",
        key: "liveStaked",
    },
    {
        title: "DEGA ACCUMULATED REWARD",
        dataIndex: "totalReward",
        key: "totalReward",
    },
];

export const rewardsPoolsColumns: ColumnsType<RewardsDataType> = [
    {
        title: "VALIDATOR",
        dataIndex: "validator",
        key: "validator",
    },
    {
        title: "NETWORK",
        dataIndex: "network",
        key: "network",
    },
    {
        title: "LIVE STAKE",
        dataIndex: "staked",
        key: "staked",
    },
    {
        title: "DEGA ACCUMULATED REWARD",
        dataIndex: "totalRewardInDega",
        key: "totalRewardInDega",
    },
];
