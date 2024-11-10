import { type FriendInfo } from '@context/homePageContext';
import PushNotification from 'react-native-push-notification';
import { keyExists } from './storage';
import { groupByBirthDayCardGroupTitle } from './sortBirthday';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';

export const notification = (friendInfo: FriendInfo) => {
    PushNotification.localNotificationSchedule({
        channelId: 'default-channel-id',
        title: '你的好友即将过生日了！',
        message: `${friendInfo.name}即将在${friendInfo.nextBirthDay}天后过生日🥳🥳🥳！不要忘了哦！`,
        date: new Date(Date.now() + 60 * 1000), // 1分钟后触发通知
        allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    });
};

export const createNotification = async () => {
    // 配置推送通知
    PushNotification.configure({
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onNotification: function (notification: any) {
            console.log('NOTIFICATION:', notification);
        },
        requestPermissions: Platform.OS === 'ios',
    });

    // 请求推送通知权限（仅限 iOS）
    if (Platform.OS === 'ios') {
        const permission = await PushNotification.requestPermissions();
        if (!permission.alert) {
            console.log('用户拒绝了推送通知权限');
            return;
        }
    }

    // 创建频道（仅限 Android）
    PushNotification.createChannel(
        {
            channelId: 'default-channel-id', // 必须是唯一的
            channelName: 'Default Channel', // 必须
            channelDescription: 'A default channel', // 可选
            soundName: 'default', // 可选
            importance: 4, // 可选
            vibrate: true, // 可选
        },
        (created: boolean) => console.log(`createChannel returned '${created}'`)
    );

    // 获取所有分组
    const groupListData = await keyExists('groupList');
    if (groupListData) {
        const groupList: FriendInfo[] = JSON.parse(groupListData);
        groupList.forEach(async group => {
            const birthDayData = await keyExists(`birthDayData-${group}`);
            if (birthDayData) {
                let friendInfoList: FriendInfo[] = JSON.parse(birthDayData);
                friendInfoList = friendInfoList.filter(friendInfo => friendInfo.isRemind);
                friendInfoList = groupByBirthDayCardGroupTitle(friendInfoList)['近期过生日'];
                friendInfoList.forEach(friendInfo => {
                    if (friendInfo.nextBirthDay <= 3) {
                        notification(friendInfo);
                    }
                });
            }
        });
    }
};

export const cancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
};

export const enableNotification = async () => {
    const NotificationData = await keyExists('Notification');
    const Notification = NotificationData ? JSON.parse(NotificationData) : false;
    if (Notification) {
        PushNotification.cancelAllLocalNotifications();
        createNotification();
    }
};

export const requestExactAlarmPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                'android.permission.WRITE_CALENDAR',
                {
                    title: '需要精确闹钟权限',
                    message: '应用需要精确闹钟权限来设置精确的通知时间。',
                    buttonNeutral: '稍后询问',
                    buttonNegative: '拒绝',
                    buttonPositive: '允许',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('精确闹钟权限已授予');
                return true;
            } else {
                Alert.alert(
                    '应用需要精确闹钟权限来设置精确的通知时间。请前往系统设置授予权限。',
                );
                setTimeout(() => {
                    Linking.openSettings();
                }, 1000);
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
};

