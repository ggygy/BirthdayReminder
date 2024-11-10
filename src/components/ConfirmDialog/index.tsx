/* eslint-disable react/react-in-jsx-scope */
import { Button, Dialog, Input, makeStyles } from '@rneui/themed';
import { FunctionComponent, memo } from 'react';
import GroupOption from './GroupOption';

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

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = ({ title, visible, toggleDialog, inputProps, groupOptionProps }) => {
    const styles = useStyles();
    return (
        <Dialog
            isVisible={visible}
            overlayStyle={styles.dialogContainer}
            onBackdropPress={toggleDialog}
        >
            <Dialog.Title title={title}/>
            { inputProps && <Input style={styles.input} label={inputProps?.label} placeholder={inputProps?.placeholder} value={inputProps?.inputValue} onChangeText={inputProps?.setInputValue}/> }
            { groupOptionProps && <GroupOption title={groupOptionProps.title} selectedGroup={groupOptionProps.selectedGroup} setSelectedGroup={groupOptionProps.setSelectedGroup} /> }
            <Dialog.Actions>
                <Button
                    title="取消"
                    type="clear"
                    titleStyle={styles.title}
                    containerStyle={styles.buttonContainer}
                    onPress={() => {
                        toggleDialog(false);
                    }}
                />
                <Button type="clear" title="确认" titleStyle={styles.title} containerStyle={styles.buttonContainer} onPress={() => toggleDialog(true)} />
            </Dialog.Actions>
        </Dialog>
        );
};

export default memo(ConfirmDialog);
