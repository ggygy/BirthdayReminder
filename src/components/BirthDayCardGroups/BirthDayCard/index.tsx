/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
import { Avatar, Button, ListItem, makeStyles } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { FunctionComponent, memo, useContext, useState } from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { type FriendInfo, HomePageConText } from '@context/homePageContext';
import BirthDayAdditional from '@components/birthDayAdditional';
import ConfirmDialog from '@components/ConfirmDialog';

export interface BirthDayCardProps {
    friendInfo: FriendInfo
    checked: boolean
}

const useStyles = makeStyles(theme => ({
    bottomDividerStyle: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 0,
        paddingVertical: 4,
        marginBottom: 1,
        alignSelf: 'center', // 居中对齐
        borderBottomWidth: 0, // 自定义分割线宽度
        borderBottomColor: theme.colors.divider,
    },
    SwipeableStyle: {
        width: 420,
        height: 88,
        padding: 0,
        borderRadius: 8,
    },
    leftContainerStyle: {
        borderRadius: 20,
    },
    leftButtonStyle: {
        minHeight: '100%',
        width: '100%',
        borderRadius: 8,
    },
    rightContainerStyle: {
        borderRadius: 20,
    },
    rightButtonStyle: {
        width: '100%',
        minHeight: '100%',
        borderRadius: 8,
    },
    SwipeableContentStyle: {
        backgroundColor: '#979797',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    leftInfoContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoContainerStyle: {
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    avatarContainerStyle: {
        backgroundColor: '#bdbdbd',
        justifyContent: 'center',
    },
    textStylePrimary: {
        color: theme.colors.white,
        fontSize: 20,
    },
    textStyleSecondary: {
        color: theme.colors.grey5,
        fontSize: 15,
    },
    icon: {
        marginLeft: 4,
        marginBottom: 15,
    },
    checkBoxStyle: {
        backgroundColor: 'transparent',
    },
}));

const BirthDayCard: FunctionComponent<BirthDayCardProps> = ({ friendInfo, checked }) => {
    const { isBatchManage, handleBatchManage, handleCheckBoxChange, deleteBirthDayCardGroupsData } = useContext(HomePageConText);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const { avatar = '', name = '', age, isRemind, birthDay, nextBirthDay } = friendInfo;
    const styles = useStyles();
    const linearGradientStart = nextBirthDay <= 31 ? '#F44336' : '#979797';
    const linearGradientEnd = nextBirthDay <= 31 ? '#FF9800' : '#bdbdbd';

    const handleSwipeableClick = () => {
        if (isBatchManage) {
            handleCheckBoxChange(friendInfo, !checked);
            return;
        }
        setIsDialogVisible(true);
    };

    const handelCardClick = () => {
        setIsDialogVisible(true);
    };

    const toggleConfirmDialog = (isConfirm?: boolean) => {
        if (isConfirm) {
            deleteBirthDayCardGroupsData(friendInfo.group, [friendInfo]);
        }
        setIsConfirmDialogVisible(false);
    };

    const handleDelete = async () => {
        setIsConfirmDialogVisible(true);
    };

    return (
        <>
            { isDialogVisible && <BirthDayAdditional visible={isDialogVisible} isEditMode={true} friendInfo={friendInfo} setIsDialogVisible={setIsDialogVisible} /> }
            <ConfirmDialog title={'是否删除这条记录，删除后无法恢复'} visible={isConfirmDialogVisible} toggleDialog={toggleConfirmDialog} />
            <ListItem bottomDivider containerStyle={styles.bottomDividerStyle}>
                <ListItem.Swipeable
                    leftWidth={60}
                    rightWidth={60}
                    minSlideWidth={20}
                    pad={0}
                    containerStyle={styles.SwipeableStyle}
                    leftStyle={styles.leftContainerStyle}
                    rightStyle={styles.rightContainerStyle}
                    onPress={() => handleSwipeableClick()}
                    onLongPress={() => handleBatchManage(!isBatchManage)}
                    leftContent={(reset) => (
                        <Button
                            title="设置"
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: [linearGradientStart, linearGradientEnd],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            onPress={() => reset()}
                            onPressOut={() => handelCardClick()}
                            buttonStyle={styles.leftButtonStyle}
                        />
                    )}
                    rightContent={(reset) => (
                        <Button
                            title="删除"
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: [linearGradientEnd, linearGradientStart],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            onPress={() => reset()}
                            onPressOut={() => handleDelete()}
                            buttonStyle={styles.rightButtonStyle}
                        />
                    )}
                >
                    <ListItem.Content style={[styles.SwipeableContentStyle, nextBirthDay <= 31 ? { backgroundColor: '#fe5165' } : undefined]} >
                        <View style={styles.leftInfoContainerStyle}>
                            {avatar ? <Avatar
                                size={56}
                                rounded
                                source={{ uri: avatar }}
                            /> : <Avatar
                                size={56}
                                title={name.slice(0, 3)}
                                containerStyle={[styles.avatarContainerStyle, nextBirthDay <= 31 ? { backgroundColor: '#fd870b' } : undefined]}
                                rounded
                                titleStyle={{ fontSize: 16 }}
                            />}
                            <View style={styles.infoContainerStyle}>
                                <ListItem.Title style={[styles.textStylePrimary, { fontSize: 18 }]}>{name}({age}岁)</ListItem.Title>
                                <ListItem.Title style={styles.textStyleSecondary}>{birthDay}</ListItem.Title>
                            </View>
                            <Ionicons name={'notifications-circle'} size={24}
                                style={[styles.icon, { color: isRemind ? '#ffe067' : '#e2a600' }]} />
                        </View>
                        {isBatchManage ? <ListItem.CheckBox
                            iconType="Ionicons"
                            size={24}
                            containerStyle={styles.checkBoxStyle}
                            checkedIcon="radio-button-on"
                            uncheckedIcon="radio-button-off"
                            checkedColor="white"
                            uncheckedColor="white"
                            checked={checked}
                            onPress={() => handleCheckBoxChange(friendInfo, !checked)} />
                            : <ListItem.Title style={styles.textStylePrimary}>
                                {nextBirthDay}
                                <ListItem.Title style={styles.textStyleSecondary}>
                                    天后
                                </ListItem.Title>
                            </ListItem.Title>}
                    </ListItem.Content>
                </ListItem.Swipeable>
            </ListItem>
        </>
    );
};

export default memo(BirthDayCard);
