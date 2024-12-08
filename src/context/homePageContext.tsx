import { groupByBirthDayCardGroupTitle } from '@utils/sortBirthday';
import { keyExists, removeKey, storeData } from '@utils/storage';
import React, { createContext, type ReactNode, useCallback, useEffect, useState } from 'react';
import { useIsFirstRender } from '../hooks/isFirstRender';

export type FriendInfo = {
  avatar?: string;
  name: string;
  age: number;
  gender: string;
  isRemind: boolean;
  birthDay: string;
  birthDayDate: Date | string;
  nextBirthDay: number;
  group: string;
};

export enum BirthDayCardGroupTitle {
  today = '今日寿星',
  oneMonth = '近期过生日',
  moreOneMonth = '一个月后过生日',
}

interface HomePageConTextType {
  isBatchManage: boolean;
  selectedItems: { [key: string]: boolean };
  group: string;
  groupList: string[];
  isCustomModalVisible: boolean;
  handleModal: (visible: boolean, callback?: () => void) => void;
  birthDayCardGroupsData: {
    [key in BirthDayCardGroupTitle]: FriendInfo[];
  };
  setGroup: (group: string) => void;
  setBirthDayCardGroupsData: (data: { [key in BirthDayCardGroupTitle]: FriendInfo[] }) => void;
  updateGroupList: (groupList: string) => void;
  deleteGroupList: (toBeDeletedGroup: string) => void;
  deleteBirthDayCardGroupsData: (groupKey: string, toBeDeletedData: FriendInfo[]) => void;
  editBirthDayCardGroupsData: (groupKey: string, toBeEditedData: FriendInfo, editedBirthDayCardData: FriendInfo) => void;
  updateBirthDayCardGroupsData: (newData: FriendInfo) => void;
  searchFriends: (query: string) => Promise<FriendInfo[]>;
  handleBatchManage: (batchManaged: boolean) => void;
  handleCheckBoxChange: (item: any, checked: boolean) => void;
}

export const HomePageConText = createContext<HomePageConTextType>({
  isBatchManage: false,
  selectedItems: {},
  group: '我的好友',
  groupList: [],
  isCustomModalVisible: false,
  handleModal: () => { },
  birthDayCardGroupsData: {
    [BirthDayCardGroupTitle.today]: [],
    [BirthDayCardGroupTitle.oneMonth]: [],
    [BirthDayCardGroupTitle.moreOneMonth]: [],
  },
  setGroup: () => { },
  setBirthDayCardGroupsData: () => { },
  deleteBirthDayCardGroupsData: () => { },
  editBirthDayCardGroupsData: () => { },
  updateBirthDayCardGroupsData: () => { },
  updateGroupList: () => { },
  deleteGroupList: () => { },
  searchFriends: () => Promise.resolve([]),
  handleBatchManage: () => { },
  handleCheckBoxChange: () => { },
});

// 创建Provider组件
export const HomePageProvider = ({ children }: { children: ReactNode }) => {
  const [isBatchManage, setIsBatchManage] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});
  const [groupList, setGroupList] = useState<string[]>(['我的好友']);
  const [group, setGroup] = useState<string>('我的好友');
  const isFirstRender = useIsFirstRender();
  const [isCustomModalVisible, setIsCustomModalVisible] = useState(false);
  const [birthDayCardGroupsData, setBirthDayCardGroupsData] = useState<{ [key in BirthDayCardGroupTitle]: FriendInfo[] }>({
    [BirthDayCardGroupTitle.today]: [],
    [BirthDayCardGroupTitle.oneMonth]: [],
    [BirthDayCardGroupTitle.moreOneMonth]: [],
  });

  // 初始化时从缓存中读取数据
  useEffect(() => {
    const fetchData = async () => {
      const data = await keyExists('groupList');
      if (data) {
        setGroupList(JSON.parse(data));
      }
    };
    fetchData();
  }, []);

  // 更新缓存中的数据
  useEffect(() => {
    storeData('groupList', groupList);
  }, [groupList]);

  // 更新缓存中的数据
  useEffect(() => {
    const friendInfoList = Object.values(birthDayCardGroupsData).flat();
    if (!friendInfoList.every(friend => friend.group === group)
      || !groupList.includes(group) || friendInfoList.length === 0) {
      return;
    }
    storeData(`birthDayData-${group}`, friendInfoList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthDayCardGroupsData]);

  // 初始化时从缓存中读取数据
  useEffect(() => {
    const fetchData = async () => {
      const data = await keyExists(`birthDayData-${group}`);
      if (data) {
        const birthDayCardGroupTempData: FriendInfo[] = JSON.parse(data);
        setBirthDayCardGroupsData(groupByBirthDayCardGroupTitle(birthDayCardGroupTempData));
      } else {
        if (isFirstRender && group === '我的好友') {
          setBirthDayCardGroupsData(groupByBirthDayCardGroupTitle([]));
          return;
        }
        setBirthDayCardGroupsData({
          [BirthDayCardGroupTitle.today]: [],
          [BirthDayCardGroupTitle.oneMonth]: [],
          [BirthDayCardGroupTitle.moreOneMonth]: [],
        });
      }
    };
    fetchData();
  }, [group, isFirstRender]);

  const handleModal = useCallback((visible: boolean, callback?: (() => void)) => {
    callback && callback();
    setIsCustomModalVisible(visible);
  } ,[]);

  const updateGroupList = useCallback((newGroup: string) => {
    setGroupList(prevState => {
      if (prevState.includes(newGroup)) {
        return prevState;
      }
      return [...prevState, newGroup];
    });
  }, []);

  const deleteGroupList = useCallback((toBeDeletedGroup: string) => {
    setGroupList(prevState => prevState.filter((item: string) => item !== toBeDeletedGroup));
    removeKey(`birthDayData-${toBeDeletedGroup}`);
  }, []);

  const deleteBirthDayCardGroupsData = useCallback(async (groupKey: string, toBeDeletedData: FriendInfo[]) => {
    const birthDayData = await keyExists(`birthDayData-${groupKey}`);
    if (birthDayData) {
      const data = JSON.parse(birthDayData);
      const newBirthDayCardData = data.filter((item: FriendInfo) =>
        !toBeDeletedData.some(deletedItem => deletedItem.name === item.name && deletedItem.birthDayDate === item.birthDayDate)
      );
      storeData(`birthDayData-${groupKey}`, newBirthDayCardData);
      setBirthDayCardGroupsData(groupByBirthDayCardGroupTitle(newBirthDayCardData));
    }
  }, []);

  const editBirthDayCardGroupsData = useCallback(async (groupKey: string, toBeEditedData: FriendInfo, editedBirthDayCardData: FriendInfo) => {
    const birthDayData = await keyExists(`birthDayData-${groupKey}`);
    if (birthDayData) {
      const data = JSON.parse(birthDayData);
      const newBirthDayCardData = data.filter((item: FriendInfo) =>
        item.name !== toBeEditedData.name && item.birthDayDate !== toBeEditedData.birthDayDate
      );

      if (groupKey !== editedBirthDayCardData.group) {
        const newGroupData = await keyExists(`birthDayData-${editedBirthDayCardData.group}`);
        if (newGroupData) {
          const newGroupDataParsed = JSON.parse(newGroupData);
          newGroupDataParsed.push(editedBirthDayCardData);
          storeData(`birthDayData-${editedBirthDayCardData.group}`, newGroupDataParsed);
        } else {
          storeData(`birthDayData-${editedBirthDayCardData.group}`, [editedBirthDayCardData]);
        }
      } else {
        newBirthDayCardData.push(editedBirthDayCardData);
      }

      storeData(`birthDayData-${groupKey}`, newBirthDayCardData);
      setBirthDayCardGroupsData(groupByBirthDayCardGroupTitle(newBirthDayCardData));
    }
  }, []);

  const updateBirthDayCardGroupsData = useCallback(async (newData: FriendInfo) => {
    const groupKey = newData.group;
    const data = await keyExists(`birthDayData-${groupKey}`);
    if (data) {
      const birthDayCardGroupTempData: FriendInfo[] = JSON.parse(data);
      const isDuplicate = birthDayCardGroupTempData.some(friend => friend.name === newData.name && friend.birthDay === newData.birthDay);
      if (!isDuplicate) {
        storeData(`birthDayData-${groupKey}`, [...birthDayCardGroupTempData, newData]);
      }
    } else {
      storeData(`birthDayData-${groupKey}`, [newData]);
    }

    if (groupKey !== group) {
      return;
    }

    setBirthDayCardGroupsData(prevState => {
      const updatedData = { ...prevState };
      const isDuplicate = Object.values(updatedData).flat().some(friend => friend.name === newData.name && friend.birthDay === newData.birthDay);
      if (!isDuplicate) {
        if (newData.nextBirthDay === 0) {
          updatedData[BirthDayCardGroupTitle.today].push(newData);
        } else if (newData.nextBirthDay <= 30) {
          updatedData[BirthDayCardGroupTitle.oneMonth].push(newData);
        } else {
          updatedData[BirthDayCardGroupTitle.moreOneMonth].push(newData);
        }
      }
      return updatedData;
    });
  }, [group]);

  const searchFriends = useCallback(async (query: string): Promise<FriendInfo[]> => {
    const allFriends: FriendInfo[] = [];
    for (const currentGroup of groupList) {
      const data = await keyExists(`birthDayData-${currentGroup}`);
      if (data) {
        const friends: FriendInfo[] = JSON.parse(data);
        allFriends.push(...friends);
      }
    }
    return allFriends.filter(friend => friend.name.includes(query) || friend.group.includes(query));
  }, [groupList]);

  const handleBatchManage = useCallback((batchManaged: boolean) => {
    setIsBatchManage(batchManaged);
    setSelectedItems({});
  }, [setIsBatchManage, setSelectedItems]);

  const handleCheckBoxChange = useCallback((item: FriendInfo, checked: boolean) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [item.name + item.birthDay]: checked,
    }));
  }, [setSelectedItems]);

  // 渲染Provider并传递state和setState函数
  return (
    <HomePageConText.Provider
      value={{
        isBatchManage,
        selectedItems,
        birthDayCardGroupsData,
        group,
        isCustomModalVisible,
        groupList,
        setGroup,
        handleModal,
        setBirthDayCardGroupsData,
        updateGroupList,
        deleteGroupList,
        deleteBirthDayCardGroupsData,
        editBirthDayCardGroupsData,
        updateBirthDayCardGroupsData,
        searchFriends,
        handleBatchManage,
        handleCheckBoxChange,
      }}>
      {children}
    </HomePageConText.Provider>
  );
};

