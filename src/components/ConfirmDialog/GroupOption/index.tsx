/* eslint-disable react/react-in-jsx-scope */
import { HomePageConText } from '@context/homePageContext';
import { makeStyles, Tab } from '@rneui/themed';
import { FunctionComponent, memo, useContext } from 'react';
import { Text, View } from 'react-native';

interface GroupOptionProps {
    title: string
    selectedGroup: number
    setSelectedGroup: (value: number) => void
}

const useStyles = makeStyles((theme) => ({
    itemContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 40,
        marginVertical: 10,
    },
    itemTitle: {
        fontSize: 16,
        lineHeight: 40,
        color: theme.colors.black,
    },
    tabContainer: {
        maxWidth: '72%',
        minHeight: 40,
    },
    tabButtonStyle: {
        color: theme.colors.black,
    },
    tabIndicatorStyle: {
        backgroundColor: theme.colors.black,
    },
}));

const GroupOption: FunctionComponent<GroupOptionProps> = ({ title, selectedGroup, setSelectedGroup }) => {
    const styles = useStyles();
    const { groupList } = useContext(HomePageConText);

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle} >{title}：</Text>
            <Tab
                value={selectedGroup}
                scrollable={true}
                style={styles.tabContainer}
                onChange={setSelectedGroup}
                titleStyle={styles.tabButtonStyle}
                indicatorStyle={styles.tabIndicatorStyle} dense>
                {
                    groupList.map((item, index) => (
                        <Tab.Item key={index}>{item}</Tab.Item>
                    ))
                }
            </Tab>
        </View>
    );
};
export default memo(GroupOption);
