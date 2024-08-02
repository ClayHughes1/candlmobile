import { KeyboardTypeOptions } from 'react-native';

export type RadioButton = {
    id: string;
    label: string;
    value: string;
};

export type Item = {
    key: string,
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions 
};
