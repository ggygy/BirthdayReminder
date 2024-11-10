import { BirthDayCardGroupTitle, FriendInfo } from '@context/homePageContext';

export const calculateNextBirthDay = (birthDayDate: Date | string): number => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const birthDay = typeof birthDayDate === 'string' ? new Date(birthDayDate) : birthDayDate;
  const nextBirthDay = new Date(currentYear, birthDay.getMonth(), birthDay.getDate());

  // 如果今年的生日已经过去，计算明年的生日
  if (nextBirthDay < today) {
    nextBirthDay.setFullYear(currentYear + 1);
  }

  // 计算天数差
  const diffTime = nextBirthDay.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // 处理平年和闰年
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const daysInYear = isLeapYear(currentYear) ? 365 : 364;

  // 如果生日是今天，设为 0 天
  if (diffDays === daysInYear || diffDays === 0) {
    return 0;
  }

  return diffDays;
};

export const groupByBirthDayCardGroupTitle = (friendInfoList: FriendInfo[]): { [key in BirthDayCardGroupTitle]: FriendInfo[] } => {
  // 更新 nextBirthDay 并根据 nextBirthDay 进行排序
  const sortedList = friendInfoList.map(friend => ({
    ...friend,
    age: new Date().getFullYear() - new Date(friend.birthDayDate).getFullYear(),
    nextBirthDay: calculateNextBirthDay(friend.birthDayDate),
  })).sort((a, b) => a.nextBirthDay - b.nextBirthDay);

  // 然后进行分组
  const groupedData: { [key in BirthDayCardGroupTitle]: FriendInfo[] } = {
    [BirthDayCardGroupTitle.today]: [],
    [BirthDayCardGroupTitle.oneMonth]: [],
    [BirthDayCardGroupTitle.moreOneMonth]: [],
  };

  sortedList.forEach(friend => {
    if (friend.nextBirthDay === 0) {
      groupedData[BirthDayCardGroupTitle.today].push(friend);
    } else if (friend.nextBirthDay <= 30) {
      groupedData[BirthDayCardGroupTitle.oneMonth].push(friend);
    } else {
      groupedData[BirthDayCardGroupTitle.moreOneMonth].push(friend);
    }
  });

  return groupedData;
};
