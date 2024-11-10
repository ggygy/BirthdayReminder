/* eslint-disable react-native/no-inline-styles */
import { Button, makeStyles } from '@rneui/themed';
import React, { FunctionComponent, memo, useContext, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import PressableWrapperText from '../../pressableText';
import { FriendInfo, HomePageConText } from '@context/homePageContext';
import ConfirmDialog from '@components/ConfirmDialog';
import CustomListItem from '@components/CustomListItem';
import { keyExists, storeData } from '@utils/storage';

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
  tools: {
    maxWidth: '30%',
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  batchManageTools: {
    maxWidth: '45%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  icon: {
    color: theme.colors.black,
    marginHorizontal: 10,
  },
  toolsLabel: {
    fontSize: 22,
    marginHorizontal: 10,
    color: theme.colors.grey4,
    fontWeight: 'bold',
  },
  layer: {
    position: 'absolute',
    top: 40,
    backgroundColor: theme.colors.background,
    zIndex: 10,
    width: 150,
    minHeight: 180,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    shadowColor: theme.colors.black, // 阴影颜色
    shadowOffset: { width: 6, height: 3 }, // 阴影偏移
    elevation: 10, // 安卓阴影
    shadowOpacity: 1, // 阴影透明度
    shadowRadius: 3.84, // 阴影半径
  },
  input: {
    width: '100%',
    height: 60,
    marginVertical: 10,
  },
}));

const Tools = memo(({ setActive }: {
  setActive: (index: number) => void;
}) => {
  const styles = useStyles();
  const [openLayer, setOpenLayer] = useState(false);
  const [options, setOptions] = useState('');
  const [groupInput, setGroupInput] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const { groupList, updateGroupList, deleteGroupList, setGroup } = useContext(HomePageConText);

  const handleDeleteGroup = () => {
    setOptions('删除');
    setIsDialogVisible(true);
  };

  const handleAddGroup = () => {
    setOptions('添加');
    setIsDialogVisible(true);
  };

  const toggleConfirmDialog = (isConfirm?: boolean) => {
    if (!isConfirm) {
      setIsDialogVisible(false);
      return;
    }
    if (options === '添加') {
      // 添加分组
      updateGroupList(groupInput);
      setGroup(groupInput);
      setActive(groupList.length);
    } else if (options === '删除') {
      // 删除分组
      deleteGroupList(groupList[selectedGroup]);
      setGroup(groupList[0]);
      setActive(0);
    }
    setIsDialogVisible(false);
    setGroupInput('');
    setTimeout(() => {
      setOpenLayer(false);
    }, 500);
  };

  return (
    <View style={styles.tools}>
      <Button
        icon={<Ionicons name={'search'}
          size={24} style={styles.icon} />}
        radius={'sm'} type="clear" />
      <Button
        icon={<Entypo name={'dots-three-vertical'}
          size={20} style={styles.icon} />} radius={'sm'} type="clear" onPress={() => setOpenLayer(!openLayer)} />
      {
        openLayer && <View style={styles.layer}>
          <CustomListItem iconName={'inbox'} iconType={'material-community'} title={'添加分组'} onPress={() => handleAddGroup()} />
          <CustomListItem iconName={'trash-can-outline'} iconType={'material-community'} title={'删除分组'} onPress={() => handleDeleteGroup()} />
        </View>
      }
      <ConfirmDialog title={`是否${options}分组`}
        inputProps={options === '添加' ? {
          placeholder: '请输入分组名称',
          inputValue: groupInput,
          setInputValue: setGroupInput,
        } : undefined}
        groupOptionProps={options === '删除' ? {
            title: '选择分组',
            selectedGroup,
            setSelectedGroup,
          } : undefined
        }
       visible={isDialogVisible} toggleDialog={toggleConfirmDialog} />
    </View>
  );
});

const BatchManageTools = memo(() => {
  const styles = useStyles();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [options, setOptions] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(0);
  const { group, groupList,selectedItems, handleBatchManage, deleteBirthDayCardGroupsData } = useContext(HomePageConText);

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
        isBatchManage ? <BatchManageTools /> : <Tools setActive={setActive}/>
      }
    </View>
  );
};

export const HomeHeaderMemo = memo(HomeHeader);
