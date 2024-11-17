/* eslint-disable react/react-in-jsx-scope */
import { makeStyles } from '@rneui/themed';
import { FunctionComponent, memo, useContext } from 'react';
import { View, Modal } from 'react-native';
import { HomePageConText } from '@context/homePageContext';

interface CustomModalProps {

}

const useStyles = makeStyles(() => ({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明背景
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
}));

const CustomModal: FunctionComponent<CustomModalProps> = () => {
    const styles = useStyles();
    const {isCustomModalVisible, handleModal} = useContext(HomePageConText);
    return (
        <Modal
            visible={isCustomModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => handleModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent} />
            </View>
        </Modal>);
};

export default memo(CustomModal);
