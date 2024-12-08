/* eslint-disable react/react-in-jsx-scope */
import ConfirmDialog from '@components/ConfirmDialog';
import CustomListItem from '@components/CustomListItem';
import { makeStyles } from '@rneui/themed';
import { FunctionComponent, useContext, useState } from 'react';
import { Alert, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { HomePageConText } from '@context/homePageContext';
import SearchPage from '@components/SearchPage';

interface ToolsProps {
	setActive: (index: number) => void;
}

const useStyles = makeStyles((theme) => ({
	tools: {
		maxWidth: '30%',
		minHeight: '100%',
		flex: 1,
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingHorizontal: 5,
		alignItems: 'center',
	},
	iconContainer: {
		marginHorizontal: 10,
		alignItems: 'center',
	},
	icon: {
		width: 24,
		color: theme.colors.black,
		marginHorizontal: 5,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0)', // 半透明背景
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	layer: {
		position: 'absolute',
		top: 45,
		right: 0,
		backgroundColor: theme.colors.background,
		zIndex: 10,
		width: 180,
		minHeight: 160,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		shadowColor: theme.colors.black, // 阴影颜色
		shadowOffset: { width: 6, height: 3 }, // 阴影偏移
		elevation: 10, // 安卓阴影
		shadowOpacity: 1, // 阴影透明度
		shadowRadius: 3.84, // 阴影半径
	},
}));

const Tools: FunctionComponent<ToolsProps> = ({ setActive }) => {
	const styles = useStyles();
	const [options, setOptions] = useState('');
	const [groupInput, setGroupInput] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [searchPageVisible, setSearchPageVisible] = useState(false);
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

	const handleLayer = () => {
		setModalVisible(true);
	};

	const toggleConfirmDialog = (isConfirm?: boolean) => {
		if (!isConfirm) {
			setIsDialogVisible(false);
			return;
		}
		if (groupInput === '' && options === '添加') {
			Alert.alert('提示', '请输入分组名称');
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
			setModalVisible(false);
		}, 500);
	};

	return (
		<View style={styles.tools}>
			<TouchableOpacity style={styles.iconContainer}>
				<Ionicons name={'search'} size={24} style={styles.icon} onPress={() => setSearchPageVisible(!searchPageVisible)}/>
			</TouchableOpacity>
			<TouchableOpacity style={styles.iconContainer} onPress={() => handleLayer()}>
				<Entypo name={'dots-three-vertical'} size={21} style={styles.icon} />
			</TouchableOpacity>
			<SearchPage searchPageVisible={searchPageVisible} handleSearchPageVisible={setSearchPageVisible} />
			<Modal
				visible={modalVisible}
				animationType="none"
				transparent={true}
				onRequestClose={() => setModalVisible(false)}
			>
				<TouchableWithoutFeedback
					onPress={() => setModalVisible(false)}
					style={styles.modalContainer}
				>
					<View style={styles.modalOverlay}>
						<View style={styles.layer}>
							<CustomListItem iconName={'inbox'} iconType={'material-community'} title={'添加分组'} onPress={() => handleAddGroup()} />
							<CustomListItem iconName={'trash-can-outline'} iconType={'material-community'} title={'删除分组'} onPress={() => handleDeleteGroup()} />
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
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
};

export default Tools;
