/* eslint-disable react/react-in-jsx-scope */
import { Dialog, Input, makeStyles } from '@rneui/themed';
import { FunctionComponent, memo } from 'react';
import GroupOption from './GroupOption';
import PressableText from '@components/pressableText';

interface ConfirmDialogProps {
    title: string;
    visible: boolean;
    toggleDialog: (isConfirm?: boolean) => void;
    inputProps?: { label?: string, placeholder?: string, inputValue?: string, setInputValue?: (value: string) => void };
    groupOptionProps?: { title: string, selectedGroup: number, setSelectedGroup: (value: number) => void };
}

const useStyles = makeStyles(theme => ({
    dialogContainer: {
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
    },
    buttonContainer: {
        width: 50,
        padding: 3,
        marginTop: 10,
        marginLeft: 30,
    },
    container: {
        maxHeight: 40,
        margin: 0,
        padding: 0,
    },
    inputContainer: {
        maxHeight: 40,
        margin: 0,
        padding: 0,
    },
    input: {
        fontSize: 16,
        padding: 0,
        margin: 0,
        height: 20,
    },
    text: {
        fontSize: 18,
        color: theme.colors.primary,
    },
}));

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = ({ title, visible, toggleDialog, inputProps, groupOptionProps }) => {
    const styles = useStyles();
    return (
        <Dialog
            isVisible={visible}
            overlayStyle={styles.dialogContainer}
            onBackdropPress={toggleDialog}
            animationType="fade"
        >
            <Dialog.Title title={title}/>
            { inputProps && <Input inputStyle={styles.input} inputContainerStyle={styles.inputContainer} containerStyle={styles.container}  label={inputProps?.label} placeholder={inputProps?.placeholder} value={inputProps?.inputValue} onChangeText={inputProps?.setInputValue}/> }
            { groupOptionProps && <GroupOption title={groupOptionProps.title} selectedGroup={groupOptionProps.selectedGroup} setSelectedGroup={groupOptionProps.setSelectedGroup} /> }
            <Dialog.Actions>
                <PressableText text="确认" style={styles.text} containerStyle={styles.buttonContainer} onPress={() => toggleDialog(true)} />
                <PressableText text="取消" style={styles.text} containerStyle={styles.buttonContainer} onPress={() => toggleDialog(false)} />
            </Dialog.Actions>
        </Dialog>
        );
};

export default memo(ConfirmDialog);
