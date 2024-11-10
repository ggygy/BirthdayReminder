/* eslint-disable react/react-in-jsx-scope */
import BirthDayCardGroup from '@components/BirthDayCardGroups/BirthDayCardGroup';
import { HomePageConText } from '@context/homePageContext';
import { makeStyles } from '@rneui/themed';
import { FunctionComponent, memo, useContext } from 'react';
import { View } from 'react-native';

interface BirthDayCardGroupsProps {

}

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: 50,
        backgroundColor: theme.colors.background,
    },
}));

const BirthDayCardGroups: FunctionComponent<BirthDayCardGroupsProps> = () => {
    const styles = useStyles();
    const { selectedItems, birthDayCardGroupsData } = useContext(HomePageConText);
    const sections = Object.entries(birthDayCardGroupsData).map(([title, data]) => ({
        title,
        data,
    }));
    return (
        <View style={styles.container}>
            <BirthDayCardGroup
                sections={sections}
                selectedItems={selectedItems}
            />
        </View>
    );
};

export default memo(BirthDayCardGroups);
