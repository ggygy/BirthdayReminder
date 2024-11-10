import RNFS from 'react-native-fs';
import { keyExists, storeData } from './storage';
import DocumentPicker from 'react-native-document-picker';
import { Alert } from 'react-native';

export const exportData = async () => {
    try {
        const groupListData = await keyExists('groupList');
        if (!groupListData) {
            Alert.alert('Error', 'No group list data found.');
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

        const directoryPath = `${RNFS.DocumentDirectoryPath}/exportedData`;
        const filePath = `${directoryPath}/birthDayData.json`;

        // 确保目标文件夹存在
        const directoryExists = await RNFS.exists(directoryPath);
        if (!directoryExists) {
            await RNFS.mkdir(directoryPath);
        }

        await RNFS.writeFile(filePath, JSON.stringify(allData), 'utf8');
        Alert.alert('Success', `Data exported to ${filePath}`);
    } catch (error) {
        Alert.alert('Error', 'Failed to export data.');
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
        console.log(importedData);

        if (importedData.groupList) {
            // await storeData('groupList', JSON.stringify(importedData.groupList));
        }

        for (const [group, data] of Object.entries(importedData)) {
            if (group !== 'groupList') {
                console.log(group, data);
                // await storeData(`birthDayData-${group}`, JSON.stringify(data));
            }
        }

        Alert.alert('Success', 'Data imported successfully!');
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            Alert.alert('Cancelled', 'File selection was cancelled.');
        } else {
            Alert.alert('Error', 'Failed to import data.');
        }
    }
};
