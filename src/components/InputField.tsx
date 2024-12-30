import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

/**
 * Custom input field component.
 *
 * @param label - Label for the input field.
 * @param value - Value of the input field.
 * @param onChangeText - Function to call when the input field value changes.
 * @param placeholder - Placeholder text for the input field.
 * @param secureTextEntry - Whether the input field should be a password field.
 * @param keyboardType - Keyboard type for the input field.
 * @param leftIconName - Icon name for the icon on the left side of the input field.
 * @param rightIconName - Icon name for the icon on the right side of the input field.
 * @param onRightIconPress - Function to call when the right icon is pressed.
 *
 * @returns A custom input field component.
 */
interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    leftIconName?: string; // Left icon
    rightIconName?: string; // Right icon
    onRightIconPress?: () => void; // Function to call when the right icon is pressed
}

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   value,
                                                   onChangeText,
                                                   placeholder,
                                                   secureTextEntry = false,
                                                   keyboardType = 'default',
                                                   leftIconName,
                                                   rightIconName,
                                                   onRightIconPress,
                                               }) => {
    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={styles.input}
            mode="outlined"
            left={leftIconName ? <TextInput.Icon icon={leftIconName} /> : undefined}
            right={
                rightIconName ? <TextInput.Icon icon={rightIconName} onPress={onRightIconPress} /> : undefined
            }
        />
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 16,
        backgroundColor: '#fff',
    },
});

export default InputField;
