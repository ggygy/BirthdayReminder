/* eslint-disable react-native/no-inline-styles */
import { Avatar, CheckBox, makeStyles, Switch, Tab } from '@rneui/themed';
import React, { FunctionComponent, memo, useContext, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import PressableWrapperText from '@components/pressableText';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { type FriendInfo, HomePageConText } from '@context/homePageContext';
import { Button } from '@rneui/base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { formatDate } from '@utils/date';
import { calculateNextBirthDay } from '@utils/sortBirthday';
import ConfirmDialog from '@components/ConfirmDialog';
import { uploadAvatar } from '@utils/avatar';

interface AddCardProps {
    friendInfo?: FriendInfo
    isEdit?: boolean
    isBatch?: boolean
    setIsDialogVisible: (value: boolean) => void
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        width: '100%',
        maxHeight: 400,
        padding: 10,
        marginTop: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    avatar: {
        backgroundColor: '#6733b9',
        marginBottom: 10,
    },
    avatarButton: {
        width: 120,
        maxWidth: 180,
        height: 32,
        padding: 0,
        margin: 0,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 10,
    },
    avatarButtonContainer: {
        padding: 0,
        margin: 0,
    },
    itemContainer: {
        display: 'flex',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 40,
        marginVertical: 10,
    },
    itemTitle: {
        fontSize: 20,
        lineHeight: 40,
        marginRight: 20,
        color: theme.colors.black,
    },
    itemInput: {
        padding: 0,
        margin: 0,
        width: '80%',
        paddingTop: 5,
        fontSize: 18,
        color: theme.colors.black,
    },
    itemInputContainer: {
        fontSize: 18,
    },
    placeholderTextColor: {
        fontSize: 18,
        color: theme.colors.grey4,
    },
    genderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    checkBoxContainer: {
        padding: 0,
        margin: 0,
    },
    checkBoxTitle: {
        fontSize: 18,
        lineHeight: 40,
        fontWeight: 'normal',
        color: theme.colors.grey3,
    },
    tabContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '70%',
        height: 40,
        padding: 0,
        margin: 0,
        paddingBottom: 2,
        marginRight: 10,
        color: theme.colors.black,
    },
    tabButtonStyle: {
        padding: 0,
        margin: 0,
        paddingBottom: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        color: theme.colors.black,
    },
    tabIndicatorStyle: {
        height: 1,
        backgroundColor: theme.colors.black,
    },
    addButtonStyle: {
        width: 36,
        height: 36,
        borderRadius: 10,
        margin: 0,
        padding: 0,
        alignContent: 'center',
        justifyContent: 'center',
    },
    saveButtonContainer: {
        width: 300,
        height: 50,
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: theme.colors.primary,
    },
}));

const InputItem = memo(({ title, value, onChangeText }: {
    title: string
    value: string
    onChangeText: (text: string) => void
}) => {
    const styles = useStyles();
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{title}</Text>
            <TextInput
                placeholder={`请输入${title}`}
                value={value}
                style={styles.itemInput}
                onChangeText={onChangeText}
                placeholderTextColor={styles.placeholderTextColor.color} />
        </View>
    );
});

const CheckBoxItem = memo(({ title, selectedGender, setSelectedGender }: {
    title: string
    selectedGender: string
    setSelectedGender: (gender: string) => void
}) => {
    const styles = useStyles();
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{title}</Text>
            <View style={styles.genderContainer}>
                <CheckBox
                    checked={selectedGender === '男'}
                    onPress={() => setSelectedGender('男')}
                    title="男"
                    containerStyle={styles.checkBoxContainer}
                    textStyle={styles.checkBoxTitle}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                />
                <CheckBox
                    checked={selectedGender === '女'}
                    onPress={() => setSelectedGender('女')}
                    title="女"
                    containerStyle={styles.checkBoxContainer}
                    textStyle={styles.checkBoxTitle}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                />
            </View>
        </View>
    );
});

const BirthdayItem = memo(({ title, birthDay, setBirthDay }: {
    title: string
    birthDay: Date | undefined
    setBirthDay: (value: Date | undefined) => void
}) => {
    const styles = useStyles();
    const [showDateTimePicker, setShowDateTimePicker] = React.useState(false);
    const handleDateTimePicker = () => {
        setShowDateTimePicker(true);
    };
    const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
        const currentDate = selectedDate || birthDay;
        setShowDateTimePicker(false);
        setBirthDay(currentDate);
    };
    return (
        <>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{title}</Text>
                <PressableWrapperText text={`${birthDay ? formatDate(birthDay) : '点击设置生日'}`} style={styles.placeholderTextColor} onPress={handleDateTimePicker} />
            </View>
            {showDateTimePicker && <RNDateTimePicker display="spinner" value={new Date()} onChange={onChange} locale="zh-CN" />}
        </>
    );
});

const GroupType = memo(({ title, selectedGroup, setSelectedGroup }: {
    title: string
    selectedGroup: number
    setSelectedGroup: (value: number) => void
}) => {
    const styles = useStyles();
    const [newGroup, setNewGroup] = useState('');
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const { groupList, updateGroupList } = useContext(HomePageConText);

    const handleAddGroup = () => {
        setIsDialogVisible(true);
    };

    const onChangeText = (text: string) => {
        setNewGroup(text);
    };

    const toggleDialog = () => {
        setIsDialogVisible(!isDialogVisible);
        if (newGroup !== '') {
            updateGroupList(newGroup);
            setTimeout(() => {
                setSelectedGroup(groupList.length);
                setNewGroup('');
            }, 1000);
        }
    };

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle} >{title}</Text>
            <Tab
                value={selectedGroup}
                scrollable={true}
                style={styles.tabContainer}
                onChange={setSelectedGroup}
                titleStyle={styles.tabButtonStyle}
                buttonStyle={styles.tabButtonStyle}
                indicatorStyle={styles.tabIndicatorStyle} dense>
                {
                    groupList.map((item, index) => (
                        <Tab.Item key={index}>{item}</Tab.Item>
                    ))
                }
            </Tab>
            <Button
                icon={<AntDesign name="plus" size={16} color="white" />}
                onPress={handleAddGroup}
                buttonStyle={styles.addButtonStyle} />
            <ConfirmDialog title={'是否增加分组'} inputProps={{
                placeholder: '请输入分组名称',
                inputValue: newGroup,
                setInputValue: onChangeText,
            }} visible={isDialogVisible} toggleDialog={toggleDialog} />
        </View>
    );
});

const SwitchItem = memo(({ title, isReminderEnabled, setIsReminderEnabled }: {
    title: string
    isReminderEnabled: boolean
    setIsReminderEnabled: (value: boolean) => void
}) => {
    const styles = useStyles();
    const toggleSwitch = () => setIsReminderEnabled(!isReminderEnabled);
    return (
        <View style={[styles.itemContainer, { justifyContent: 'space-between' }]}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#2189dc' }}
                thumbColor={isReminderEnabled ? '#2189dc' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isReminderEnabled}
            />
        </View>
    );
});

const AddCard: FunctionComponent<AddCardProps> = ({
    setIsDialogVisible,
    isEdit = false,
    isBatch = false,
    friendInfo = {
        avatar: undefined,
        name: '',
        age: 0,
        gender: '男',
        isRemind: false,
        birthDay: '',
        birthDayDate: '',
        nextBirthDay: 0,
        group: '我的好友',
    },
}) => {
    const styles = useStyles();
    const { groupList, updateBirthDayCardGroupsData, editBirthDayCardGroupsData } = useContext(HomePageConText);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(friendInfo.avatar);
    const [name, setName] = useState(friendInfo.name);
    const [selectedGender, setSelectedGender] = useState(friendInfo.gender);
    const [birthDay, setBirthDay] = useState<Date | undefined>(friendInfo.birthDayDate ? new Date(friendInfo.birthDayDate) : undefined);
    const [selectedGroup, setSelectedGroup] = useState(friendInfo.group ? groupList.indexOf(friendInfo.group) : 0);
    const [isReminderEnabled, setIsReminderEnabled] = useState(friendInfo.isRemind);

    useEffect(() => {
        if (!isEdit) {
            setSelectedGroup(0);
        }
    }, [isEdit]);

    const handleUploadAvatar = () => {
        uploadAvatar((destPath) => {
            setAvatar(destPath);
        });
    };

    const handleSave = () => {
        const data = {
            avatar,
            name,
            age: birthDay ? new Date().getFullYear() - birthDay.getFullYear() : 0,
            gender: selectedGender,
            isRemind: isReminderEnabled,
            birthDay: birthDay ? formatDate(birthDay) : '',
            birthDayDate: birthDay ?? new Date(),
            nextBirthDay: birthDay ? calculateNextBirthDay(birthDay) : 0,
            group: groupList[selectedGroup],
        };
        updateBirthDayCardGroupsData(data);
        if (isBatch) {
            // 清空状态
            setAvatar(undefined);
            setName('');
            setSelectedGender('男');
            setBirthDay(undefined);
            setSelectedGroup(0);
            setIsReminderEnabled(false);
        } else {
            setLoading(true);
            setTimeout(() => {
                setIsDialogVisible(false);
                setLoading(false);
            }, 1000);
        }
    };

    const handleEdit = () => {
        const data = {
            avatar,
            name,
            age: birthDay ? new Date().getFullYear() - birthDay.getFullYear() : 0,
            gender: selectedGender,
            isRemind: isReminderEnabled,
            birthDay: birthDay ? formatDate(birthDay) : '',
            birthDayDate: birthDay ?? new Date(),
            nextBirthDay: birthDay ? calculateNextBirthDay(birthDay) : 0,
            group: groupList[selectedGroup],
        };
        editBirthDayCardGroupsData(friendInfo.group, friendInfo, data);
        setLoading(true);
        setTimeout(() => {
            setIsDialogVisible(false);
            setLoading(false);
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <Avatar
                size={80}
                rounded
                source={avatar ? { uri: avatar } : undefined}
                containerStyle={styles.avatar}
            />
            <Button type="outline" buttonStyle={styles.avatarButton} containerStyle={styles.avatarButtonContainer} title="上传头像" onPress={handleUploadAvatar} />
            <InputItem title="姓名" value={name} onChangeText={setName} />
            <CheckBoxItem title="性别" selectedGender={selectedGender} setSelectedGender={setSelectedGender} />
            <BirthdayItem title="生日" birthDay={birthDay} setBirthDay={setBirthDay} />
            <GroupType title="分组" selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
            <SwitchItem title="设置生日提醒" isReminderEnabled={isReminderEnabled} setIsReminderEnabled={setIsReminderEnabled} />
            <Button buttonStyle={styles.saveButtonContainer} title="保存" loading={loading} onPressOut={() => {
                isEdit ? handleEdit() : handleSave();
            }} />
        </View>
    );
};

export default memo(AddCard);
