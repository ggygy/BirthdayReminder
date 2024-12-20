export const formatDate = (date: Date): string => {
    const formatter = new Intl.DateTimeFormat('zh-CN', {
        month: 'long',
        day: 'numeric',
    });
    return formatter.format(date);
};

// 格式化日期为 ISO 字符串格式，并设置当前时区
const formatToLocalISOString = (date: Date) => {
    const tzOffset = -date.getTimezoneOffset() * 60000; // 时区偏移量，以毫秒为单位
    const localISOTime = new Date(date.getTime() + tzOffset).toISOString().slice(0, -1); // 去掉最后的 'Z'
    return localISOTime;
};

export const getStartAndEndDate = (date: Date | string) => {
    const birthDate = new Date(date);
    const now = new Date();

    // 获取生日的月和日
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    // 计算今年的生日
    let startDate = new Date(now.getFullYear(), birthMonth, birthDay, 10, 0, 0, 0); // 设置为当天早上10点
    let endDate = new Date(now.getFullYear(), birthMonth, birthDay, 22, 0, 0, 0); // 设置为当天晚上10点

    // 如果今年的生日已经过去，则取明年的日期
    if (now > endDate) {
        startDate = new Date(now.getFullYear() + 1, birthMonth, birthDay, 10, 0, 0, 0);
        endDate = new Date(now.getFullYear() + 1, birthMonth, birthDay, 22, 0, 0, 0);
    }

    return {
        startDate: formatToLocalISOString(startDate),
        endDate: formatToLocalISOString(endDate),
    };
};

// 通过生日计算星座
export const getZodiacSign = (date: Date | string) => {
    const birthDate = new Date(date);
    const month = birthDate.getMonth() + 1; // 月份从0开始，需要加1
    const day = birthDate.getDate();

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        return '水瓶座';
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
        return '双鱼座';
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        return '白羊座';
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        return '金牛座';
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        return '双子座';
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        return '巨蟹座';
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        return '狮子座';
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        return '处女座';
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        return '天秤座';
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        return '天蝎座';
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        return '射手座';
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return '摩羯座';
    }
};
