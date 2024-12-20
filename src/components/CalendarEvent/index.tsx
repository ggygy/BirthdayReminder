import { makeStyles } from '@rneui/themed';
import React, { type FunctionComponent, memo, useEffect, useState } from 'react';
import { View, Text, Button, Alert, Modal, TextInput } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';


interface CalendarEventProps {
    startDate: string;
    endDate: string;
    calendarEventVisible: boolean;
    handleCalendarEventVisible: (visible: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: theme.colors.background, // 模态框背景色
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        color: theme.colors.black,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        color: theme.colors.black,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
}));

const CalendarEvent: FunctionComponent<CalendarEventProps> = ({ startDate, endDate, calendarEventVisible, handleCalendarEventVisible }) => {
    const styles = useStyles();
    const [eventTitle, setEventTitle] = useState('好友生日提醒');
    const [eventLocation, setEventLocation] = useState('你的城市');
    const [eventNotes, setEventNotes] = useState('不要忘记给好友送上生日祝福！');
    const [calendarPermission, setCalendarPermission] = useState<string | null>(null);

    useEffect(() => {
        const requestCalendarPermission = async () => {
            try {
                const status = await RNCalendarEvents.requestPermissions();
                setCalendarPermission(status);
            } catch (error) {
                console.error('请求日历权限失败', error);
            }
        };

        requestCalendarPermission();
    }, []);

    useEffect(() => {
        if (calendarPermission === 'authorized') {
            // Alert.alert('日历权限已授予');
        } else if (calendarPermission === 'denied') {
            Alert.alert('需要日历权限来写入日程');
        }
    }, [calendarPermission]);

    const addEventToCalendar = async () => {
        try {
            const eventId = await RNCalendarEvents.saveEvent(eventTitle, {
                startDate,
                endDate,
                location: eventLocation,
                notes: eventNotes,
                alarms: [{ date: -60 }], // 提前60分钟提醒
            });
            Alert.alert('日程已添加到日历', `事件ID: ${eventId}`);
            handleCalendarEventVisible(false);
        } catch (error) {
            console.error('添加日程失败', error);
            Alert.alert('添加日程失败');
        }
    };

    return (
        <Modal
            visible={calendarEventVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => handleCalendarEventVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>添加日程到日历</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="事件标题"
                        value={eventTitle}
                        onChangeText={setEventTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="事件地点"
                        value={eventLocation}
                        onChangeText={setEventLocation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="事件备注"
                        value={eventNotes}
                        onChangeText={setEventNotes}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="添加日程" onPress={addEventToCalendar} />
                        <Button title="取消" onPress={() => handleCalendarEventVisible(false)} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default memo(CalendarEvent);
