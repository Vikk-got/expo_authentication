import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const CustomButton = memo(({ title, onPress, loading, type = 'primary', style }) => {
    const isSecondary = type === 'secondary';
    const isOutline = type === 'outline';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isSecondary && styles.secondaryButton,
                isOutline && styles.outlineButton,
                style
            ]}
            onPress={onPress}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color={isOutline ? '#007AFF' : '#fff'} />
            ) : (
                <Text style={[
                    styles.text,
                    isOutline && styles.outlineText
                ]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
        marginVertical: 8,
    },
    secondaryButton: {
        backgroundColor: '#34C759',
        shadowColor: '#34C759',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
        shadowOpacity: 0,
        elevation: 0,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    outlineText: {
        color: '#007AFF',
    }
});
