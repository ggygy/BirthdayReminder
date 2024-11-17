/* eslint-disable react-native/no-inline-styles */
import { makeStyles } from '@rneui/themed';
import React, { FunctionComponent, memo, useContext, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import PressableWrapperText from '../../pressableText';
import { FriendInfo, HomePageConText } from '@context/homePageContext';
import ConfirmDialog from '@components/ConfirmDialog';
import { keyExists, storeData } from '@utils/storage';
import Tools from '@components/ToolsBox/Tools';

interface HomeHeaderProps {

}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 50,
    maxHeight: 50,
    width: '100%',
    backgroundColor: theme.colors.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  group: {
    maxWidth: '70%',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 18,
    marginHorizontal: 8,
    color: theme.colors.black,
  },
  labelActive: {
    fontSize: 24,
    marginHorizontal: 8,
    color: theme.colors.black,
  },
  batchManageTools: {
    minWidth: '25%',
    minHeight: '100%',
    flex: 1,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  icon: {
    color: theme.colors.black,
    marginHorizontal: 5,
  },
  toolsLabel: {
    fontSize: 22,
    marginHorizontal: 10,
    color: theme.mode === 'dark' ? 'white' : theme.colors.grey3,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 60,
    marginVertical: 10,
  },
}));

const BatchManageTools = memo(() => {
  const styles = useStyles();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [options, setOptions] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(0);
  const { group, groupList, selectedItems, handleBatchManage, deleteBirthDayCardGroupsData } = useContext(HomePageConText);

  const handleCancel = () => {
    handleBatchManage(false);
  };

  const handleDelete = () => {
    setOptions('删除');
    setIsDialogVisible(true);
  };

  const handleMove = () => {
    setOptions('移动');
    setIsDialogVisible(true);
  };

  const toggleConfirmDialog = async (isConfirm?: boolean) => {
    if (!isConfirm) {
      setIsDialogVisible(false);
      return;
    }
    const selectedKeys = Object.keys(selectedItems).filter(key => selectedItems[key]);
    const groupKey = groupList[selectedGroup];

    if (selectedKeys.length === 0) {
      Alert.alert('提示', `请选择要${options}的项目`);
      return;
    }
    const data = await keyExists(`birthDayData-${group}`);
    const toBeDeletedData = selectedKeys.map(key => {
      if (!data) {
        return;
      }
      const birthDayData: FriendInfo[] = JSON.parse(data);
      return birthDayData.find((item: FriendInfo) => item.name + item.birthDay === key);
    });
    await deleteBirthDayCardGroupsData(group, toBeDeletedData.filter(item => item !== undefined));
    if (options === '移动' && groupKey !== group) {
      const anotherGroupData = await keyExists(`birthDayData-${groupKey}`);
      const newData = toBeDeletedData.filter(item => item !== undefined);
      if (anotherGroupData) {
        const birthDayData: FriendInfo[] = JSON.parse(anotherGroupData);
        newData.forEach(item => {
          birthDayData.push(item);
        });
        await storeData(`birthDayData-${groupKey}`, birthDayData);
      } else {
        await storeData(`birthDayData-${groupKey}`, newData);
      }
    }
    handleBatchManage(false);
    setIsDialogVisible(false);
  };

  return (
    <View style={styles.batchManageTools}>
      <PressableWrapperText text={'移动'} style={styles.toolsLabel} onPress={() => handleMove()} />
      <PressableWrapperText text={'删除'} style={styles.toolsLabel} onPress={() => handleDelete()} />
      <PressableWrapperText text={'取消'} style={styles.toolsLabel} onPress={() => handleCancel()} />
      <ConfirmDialog
        title={'是否进行此批量操作'}
        groupOptionProps={
          options === '移动' ? {
            title: '选择分组',
            selectedGroup,
            setSelectedGroup,
          } : undefined
        }
        visible={isDialogVisible}
        toggleDialog={toggleConfirmDialog} />
    </View>
  );
});

const HomeHeader: FunctionComponent<HomeHeaderProps> = () => {
  const styles = useStyles();
  const { groupList, setGroup, isBatchManage } = useContext(HomePageConText);
  const [active, setActive] = useState(0);

  const handlePress = (item: string, index: number) => {
    setGroup(item);
    setActive(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true} // 设置为横向滚动
        showsHorizontalScrollIndicator={false} // 隐藏水平滚动条
        showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
        contentContainerStyle={{ alignItems: 'center' }}
        style={styles.group}>
        {
          groupList.map((item, index) => {
            return <PressableWrapperText key={index}
              style={active === index ? styles.labelActive : styles.label}
              text={item}
              onPress={() => handlePress(item, index)}
              underline={active === index}
              activeOpacity={1}
              underlineColor="red"
            />;
          })
        }
      </ScrollView>
      {
        isBatchManage ? <BatchManageTools /> : <Tools setActive={setActive} />
      }
    </View>
  );
};

export const HomeHeaderMemo = memo(HomeHeader);
