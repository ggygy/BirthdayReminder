export const formatDate = (date: Date): string => {
    const formatter = new Intl.DateTimeFormat('zh-CN', {
        month: 'long',
        day: 'numeric',
    });
    return formatter.format(date);
};
