/* eslint-disable react/react-in-jsx-scope */
import BirthDayCard from '@components/BirthDayCardGroups/BirthDayCard';
import PressableWrapperText from '@components/pressableText';
import { type FriendInfo } from '@context/homePageContext';
import { makeStyles } from '@rneui/themed';
import { FunctionComponent, memo } from 'react';
import { ListRenderItemInfo, SectionList } from 'react-native';

interface BirthDayCardGroupProps {
    sections: {
        title: string;
        data: FriendInfo[];
    }[]
    selectedItems: { [key: string]: boolean };
}

const useStyles = makeStyles(theme => ({
    textContainerStyle: {
        width: 'auto',
        paddingHorizontal: 10,
        marginTop: 3,
        marginBottom: 5,
    },
    textStyle: {
        fontSize: 18,
        alignSelf: 'flex-start',
        color: theme.colors.grey1,
    },
    listItemContainer: {
        display: 'flex',
        backgroundColor: theme.colors.white,
    },
}));

const BirthDayCardGroup: FunctionComponent<BirthDayCardGroupProps> = ({ sections, selectedItems }) => {
    const styles = useStyles();

    return (
        <SectionList
            sections={sections}
            contentContainerStyle={styles.listItemContainer}
            renderSectionHeader={({ section: { title, data } }) => {
                if (data?.length === 0) {return null;}
                return <PressableWrapperText text={title}
                    containerStyle={styles.textContainerStyle}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={[styles.textStyle, title === '今日寿星' && { color: 'red' }]}
                />;
            }}
            renderItem={({ item }: ListRenderItemInfo<FriendInfo>) => (
                <BirthDayCard
                    friendInfo={item}
                    checked={selectedItems[item.name + item.birthDay] ?? false}
                />
            )}
            keyExtractor={item => item.name + item.birthDay + item.age}
        />
    );
};

export default memo(BirthDayCardGroup);
