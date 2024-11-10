/* eslint-disable react/react-in-jsx-scope */
import { Dialog, Input, makeStyles } from '@rneui/themed';
import { FunctionComponent, memo } from 'react';

interface ConfirmDialogProps {
    title: string;
    visible: boolean;
    toggleDialog: (isConfirm?: boolean) => void;
    inputProps?: { label?: string, placeholder?: string, inputValue?: string, setInputValue?: (value: string) => void };
}

const useStyles = makeStyles(theme => ({
    dialogContainer: {
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: theme.colors.primary,
    },
    buttonContainer: {
        width: '40%',
        marginHorizontal: '4%',
    },
    input: {
        width: '90%',
        height: 30,
        padding: 0,
        margin: 0,
    },
}));

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = ({ title, visible, toggleDialog, inputProps }) => {
    const styles = useStyles();
    return (
        <Dialog
            isVisible={visible}
            overlayStyle={styles.dialogContainer}
            onBackdropPress={toggleDialog}
        >
            <Dialog.Title title={title}/>
            { inputProps && <Input style={styles.input} label={inputProps?.label} placeholder={inputProps?.placeholder} value={inputProps?.inputValue} onChangeText={inputProps?.setInputValue}/> }
            <Dialog.Actions>
                <Dialog.Button
                    title="取消"
                    titleStyle={styles.title}
                    containerStyle={styles.buttonContainer}
                    onPress={() => {
                        toggleDialog(false);
                    }}
                />
                <Dialog.Button title="确认" titleStyle={styles.title} containerStyle={styles.buttonContainer} onPress={() => toggleDialog(true)} />
            </Dialog.Actions>
        </Dialog>
        );
};

export default memo(ConfirmDialog);
