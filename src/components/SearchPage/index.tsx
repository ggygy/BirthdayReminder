import React, { FunctionComponent, useCallback, useContext, useState } from 'react';
import SearchBar from './SearchBar';
import { FlatList, ListRenderItemInfo, Modal, Text, TouchableOpacity, View } from 'react-native';
import BirthDayCard from '@components/BirthDayCardGroups/BirthDayCard';
import { FriendInfo, HomePageConText } from '@context/homePageContext';
import { makeStyles } from '@rneui/themed';

interface SearchPageProps {
    searchPageVisible: boolean;
    handleSearchPageVisible: (visible: boolean) => void;
}

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const useStyles = makeStyles((theme) => ({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    header: {
        marginTop: 10,
        maxHeight: 40,
        marginBottom: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
    },
    headerButtonIcon: {
        height: 40,
        lineHeight: 40,
        color: theme.colors.black,
    },
    headerButtonTitle: {
        fontSize: 17,
        lineHeight: 40,
        marginRight: 10,
        color: theme.colors.grey2,
    },
}));

const SearchPage: FunctionComponent<SearchPageProps> = ({ searchPageVisible, handleSearchPageVisible }) => {
    const styles = useStyles();
    const { searchFriends } = useContext(HomePageConText);
    const [searchResult, setSearchResult] = useState<FriendInfo[]>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(
        debounce(async (query: string) => {
            if (!query) {
                setSearchResult([]);
                return;
            }
            const result = await searchFriends(query);
            setSearchResult(result);
        }, 300),
    []);

    const handleModalClose = (visible: boolean) => {
        setSearchResult([]);
        handleSearchPageVisible(visible);
    };

    return (
        <Modal
            visible={searchPageVisible}
            animationType="fade"
            transparent={false}
            onRequestClose={() => handleModalClose(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <SearchBar placeholder="搜索..." onSearch={handleSearch} setSearchResult={setSearchResult}/>
                    <TouchableOpacity onPress={() => handleModalClose(false)} activeOpacity={0.4}>
                        <Text style={styles.headerButtonTitle}>取消</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={searchResult}
                    renderItem={({ item }: ListRenderItemInfo<FriendInfo>) => (
                        <BirthDayCard
                            friendInfo={item} checked={false} needBatchManage={false} />
                    )}
                    keyExtractor={item => item.name + item.birthDay + item.age}
                />
            </View>
        </Modal>
    );
};

export default SearchPage;
