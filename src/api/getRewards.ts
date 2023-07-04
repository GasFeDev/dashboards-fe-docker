import { axiosClient } from "./config";


interface RewardsPools {
    skip: number;
    limit: number;
    network?: string;
}

interface RewardsTable {
    filters: {
        searchText: string;
        token?: any[];
        startDate?: string;
        endDate?: string;
    },
    skip: number;
    limit: number;

}

interface RewardSearch {
    filters: {
        searchText: string;
        token?: any[];
        startDate?: string;
        endDate?: string;
    },
    skip: number;
    limit: number;
}

interface RewardSearchByAddresses {
    addresses: string[];
    skip: number;
    limit: number;
}

const getRewardsTable = async (rewawardsTable: RewardsTable) => {
    try {
        const response = await axiosClient.post('/rewards/table', {
            params: rewawardsTable
        }).then((response) => {

            return response.data;

        }).catch((error) => {
            console.log(error);
            return [];
        });

        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getRewardsBySearch = async (rewardSearch: RewardSearch) => {
    try {

        const response = await axiosClient.post('/rewards/search',
            {
                params: rewardSearch
            }).then((response) => {

                return response.data;

            }).catch((error) => {
                console.log(error);
                return error;
            });

        return response;
    } catch (error) {
        console.log(error);
    }
};

const getRewardsByAddresses = async (rewardSearch: RewardSearchByAddresses) => {
    try {

        const response = await axiosClient.post('/rewards/searchByAddresses',
            {
                params: rewardSearch
            }).then((response) => {

                return response.data;

            }).catch((error) => {
                console.log(error);
                return error;
            });

        return response;
    } catch (error) {
        console.log(error);
    }
};


const getRewardsByPools = async (rewardSearch: RewardsPools) => {
    try {

        const response = await axiosClient.post('/rewards/searchByPool',
            {
                params: rewardSearch
            }).then((response) => {

                return response.data;

            }).catch((error) => {
                console.log(error);
                return error;
            });

        return response;
    } catch (error) {
        console.log(error);
    }
};

const getGraphsByPools = async (network: string) => {
    try {

        const response = await axiosClient.post('/graphs/pools',
            {
                params: {
                    network: network
                }
            }).then((response) => {

                return response.data;

            }).catch((error) => {
                console.log(error);
                return error;
            });

        return response;
    } catch (error) {
        console.log(error);
    }
};



export { getRewardsTable, getRewardsBySearch, getRewardsByAddresses, getRewardsByPools, getGraphsByPools }