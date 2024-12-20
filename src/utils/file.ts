import RNFS from 'react-native-fs';
import { keyExists, removeKey, storeData } from './storage';
import DocumentPicker from 'react-native-document-picker';
import { Alert, BackHandler } from 'react-native';

export const exportData = async () => {
    try {
        const groupListData = await keyExists('groupList');
        if (!groupListData) {
            Alert.alert('导出失败', '未找到好友分组列表数据。');
            return;
        }

        const groupList = JSON.parse(groupListData);
        const allData: { [key: string]: any } = { groupList };

        for (const group of groupList) {
            const birthDayData = await keyExists(`birthDayData-${group}`);
            if (birthDayData) {
                allData[group] = JSON.parse(birthDayData);
            }
        }
        const directoryPath = `${RNFS.DownloadDirectoryPath}`;
        const filePath = `${directoryPath}/birthDayData.json`;

        // 确保目标文件夹存在
        const directoryExists = await RNFS.exists(directoryPath);
        if (!directoryExists) {
            await RNFS.mkdir(directoryPath);
        }

        await RNFS.writeFile(filePath, JSON.stringify(allData), 'utf8');
        Alert.alert('导出成功', `数据被导出至 ${filePath}`);
    } catch (error) {
        Alert.alert('导出失败', '导出数据失败: ${error}');
    }
};

export const importData = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: ['application/json'], // 指定文件类型为 JSON
        });

        const fileUri = res[0].uri;
        const fileContent = await RNFS.readFile(fileUri, 'utf8');
        const importedData = JSON.parse(fileContent);

        // 先清除原有数据
        const groupList = await keyExists('groupList');
        if (groupList) {
            const currentGroupList = JSON.parse(groupList);
            for (const group of currentGroupList) {
                await removeKey(`birthDayData-${group}`);
            }
        }
        await removeKey('groupList');

        if (importedData?.groupList) {
            await storeData('groupList', importedData.groupList);
            for (const [group, data] of Object.entries(importedData)) {
                if (group !== 'groupList') {
                    await storeData(`birthDayData-${group}`, data);
                }
            }
        }

        Alert.alert('导入成功', '数据导入成功！', [
            {
                text: 'OK',
                onPress: () => {
                    // 退出应用程序
                    BackHandler.exitApp();
                },
            },
        ]);
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            Alert.alert('导入被取消', '文件选择被取消。');
        } else {
            Alert.alert(`导入失败：${err}`, '导入数据失败。');
        }
    }
};
