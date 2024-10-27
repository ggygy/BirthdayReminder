import AsyncStorage from '@react-native-async-storage/async-storage';

export const keyExists = async (key: string) => {
  try {
    // 尝试获取键的值
    const value = await AsyncStorage.getItem(key);
    // 如果 value 不是 null，则表示键存在
    if (value !== null) {
      return value;
    }
    return false;
  } catch (error) {
    // 处理可能发生的错误
    console.error('Error checking if key exists:', error);
    return false;
  }
};

export const appendDataToKey = async (key: string, newData: Array<object>) => {
  try {
    // 尝试获取键的当前值
    const currentValue = await keyExists(key);
    let updatedValue;
    // 如果键存在，则将新数据追加到当前值的后面
    if (currentValue !== false) {
      // 将字符串转换为 JSON 对象
      const currentValueObj = JSON.parse(currentValue);
      // 假设我们存储的是数组，将新数据追加到数组中
      updatedValue = JSON.stringify(currentValueObj.concat(newData));
    } else {
      // 如果键不存在，直接使用新数据
      updatedValue = JSON.stringify(newData);
    }

    // 保存更新后的值
    await AsyncStorage.setItem(key, updatedValue);
    console.log('Data appended and updated successfully!');
  } catch (error) {
    // 处理可能发生的错误
    console.error('Error appending data to key:', error);
  }
};

export const removeKey = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Key ${key} removed successfully`);
  } catch (error) {
    console.error(`Failed to remove key ${key}:`, error);
  }
};
