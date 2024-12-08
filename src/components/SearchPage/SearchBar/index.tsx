import React, { FunctionComponent, useEffect, useState } from 'react';
import { makeStyles, SearchBar as SearchBarUI } from '@rneui/themed';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    setSearchResult?: (result: any) => void;
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 40,
        maxHeight: 40,
        paddingHorizontal: 2,
        width: '100%',
        backgroundColor: theme.colors.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input: {
        fontSize: 16,
        color: theme.colors.black,
    },
}));

const SearchBar: FunctionComponent<SearchBarProps> = ({ placeholder = 'Search...', onSearch, setSearchResult }) => {
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const styles = useStyles();

    const updateSearch = async (query: string) => {
        setIsLoading(true);
        if (!query) {
            setSearchResult && setSearchResult([]);
            setIsLoading(false);
        }
        setSearch(query);
        if (onSearch && query) {
            await onSearch(query);
        }
    };

    useEffect(() => {
        search && setIsLoading(false);
    }, [search]);

    return (
        <SearchBarUI
            platform="android"
            placeholder={placeholder}
            onChangeText={updateSearch}
            onCancel={() => updateSearch('')}
            value={search}
            containerStyle={styles.container}
            inputStyle={styles.input}
            showLoading={isLoading}
        />
    );
};

export default SearchBar;
