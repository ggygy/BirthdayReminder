/* eslint-disable react/react-in-jsx-scope */
import { Dialog, makeStyles, Text } from '@rneui/themed';
import { FunctionComponent, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    headerButtonContainer: {
        height: 40,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
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

    const toggleDialog = () => {
        setIsDialogVisible && setIsDialogVisible(false);
    };

    return (
        <Dialog
            isVisible={visible}
            overlayStyle={styles.container}
            onBackdropPress={toggleDialog}
        >
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButtonContainer} onPress={toggleDialog}>
                    <Ionicons name={'chevron-back'} size={32}  style={styles.headerButtonIcon} />
                </TouchableOpacity>
                <Text style={styles.headerButtonTitle}>{isEditMode ? '编辑好友生日' : '添加生日'}</Text>
            </View>

            <AddCard setIsDialogVisible={setIsDialogVisible} isBatch={isBatch} isEdit={isEditMode} friendInfo={friendInfo}/>
        </Dialog>
    );
};

export default memo(BirthDayAdditional);
