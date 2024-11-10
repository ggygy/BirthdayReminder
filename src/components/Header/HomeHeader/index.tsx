/* eslint-disable react-native/no-inline-styles */
import { Button, Icon, ListItem, makeStyles } from '@rneui/themed';
import React, { FunctionComponent, memo, useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import PressableWrapperText from '../../pressableText';
import { HomePageConText } from '@context/homePageContext';
import ConfirmDialog from '@components/ConfirmDialog';
import CustomListItem from '@components/CustomListItem';

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
  }
}));

const Tools = memo(() => {
  const styles = useStyles();
  const [openLayer, setOpenLayer] = React.useState(false);
  const [options, setOptions] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [groupInput, setGroupInput] = useState('');

  const handleDeleteGroup = () => {
    console.log('删除分组');
    setOptions('删除');
    setIsDialogVisible(true);
  };

  const handleAddGroup = () => {
    console.log('添加分组');
    setOptions('添加');
    setIsDialogVisible(true);
  };

  const toggleConfirmDialog = (isConfirm?: boolean) => {
    setIsDialogVisible(false);
    setOpenLayer(false);
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
      <ConfirmDialog title={`是否${options}分组`} inputProps={{
          placeholder: '请输入分组名称',
          inputValue: groupInput,
          setInputValue: setGroupInput,
        }} visible={isDialogVisible} toggleDialog={toggleConfirmDialog} />
    </View>
  );
});

const BatchManageTools = memo(() => {
  const styles = useStyles();
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const { group, selectedItems, handleBatchManage, deleteBirthDayCardGroupsData } = useContext(HomePageConText);

  const handleCancel = () => {
    handleBatchManage(false);
  };

  const handleDelete = () => {
    setIsDialogVisible(true);
  };

  const toggleConfirmDialog = (isConfirm?: boolean) => {
    if (isConfirm) {
      deleteBirthDayCardGroupsData(group, undefined);
    }
    setIsDialogVisible(false);
  };

  return (
    <View style={styles.batchManageTools}>
      <PressableWrapperText text={'移动'} style={styles.toolsLabel} />
      <PressableWrapperText text={'删除'} style={styles.toolsLabel} onPress={() => handleDelete()} />
      <PressableWrapperText text={'取消'} style={styles.toolsLabel} onPress={() => handleCancel()} />
      <ConfirmDialog title={'是否进行此批量操作'} visible={isDialogVisible} toggleDialog={toggleConfirmDialog} />
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
        isBatchManage ? <BatchManageTools /> : <Tools />
      }
    </View>
  );
};

export const HomeHeaderMemo = memo(HomeHeader);
