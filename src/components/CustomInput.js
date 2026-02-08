import React, { memo } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export const CustomInput = memo(({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, autoCapitalize }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F2F2F7',
        padding: 16,
        borderRadius: 12,
        fontSize: 16,
        color: '#000',
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
});
