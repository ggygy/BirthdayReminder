/* eslint-disable react/react-in-jsx-scope */
import { Dialog, makeStyles, Text } from '@rneui/themed';
import { FunctionComponent, memo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddCard from './AddCard';
import { type FriendInfo } from '@context/homePageContext';

interface BirthDayAdditionalProps {
    visible?: boolean;
    isBatch?: boolean;
    isEditMode?: boolean;
    friendInfo?: FriendInfo;
    setIsDialogVisible: (value: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        maxHeight: '100%',
        minWidth: '100%',
        paddingVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: theme.colors.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        maxHeight: 40,
        marginBottom: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    headerButton: {
        paddingHorizontal: 0,
    },
    headerButtonIcon: {
        height: 40,
        lineHeight: 40,
        color: theme.colors.black,
    },
    headerButtonTitle: {
        fontSize: 20,
        lineHeight: 40,
    },
}));

const BirthDayAdditional: FunctionComponent<BirthDayAdditionalProps> = ({
    visible = false,
    isBatch = false,
    isEditMode = false,
    friendInfo,
    setIsDialogVisible,
}) => {

    const styles = useStyles();
    const [isAddCardVisible, setIsAddCardVisible] = useState(false);

    const toggleDialog = () => {
        setIsDialogVisible && setIsDialogVisible(false);
    };

    const handleDialogShow = () => {
        setIsAddCardVisible(true);
    };

    return (
        <Dialog
            isVisible={visible}
            overlayStyle={styles.container}
            onBackdropPress={toggleDialog}
            onShow={handleDialogShow}
            animationType="fade"
        >
            <TouchableOpacity style={styles.header} onPress={toggleDialog} activeOpacity={0.4}>
                <Ionicons name={'chevron-back'} size={32}  style={styles.headerButtonIcon} />
                <Text style={styles.headerButtonTitle}>{isEditMode ? '编辑好友生日' : '添加生日'}</Text>
            </TouchableOpacity>
            { isAddCardVisible && <AddCard setIsDialogVisible={setIsDialogVisible} isBatch={isBatch} isEdit={isEditMode} friendInfo={friendInfo}/> }
        </Dialog>
    );
};

export default memo(BirthDayAdditional);
