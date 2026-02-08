import { View, ActivityIndicator } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import React, { useState, useEffect, memo } from 'react';

const RootLayout = memo(() => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        // Listen for authentication state to change.
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (user && inAuthGroup) {
            router.replace('/(tabs)');
        } else if (!user && !inAuthGroup) {
            router.replace('/(auth)/login');
        }
    }, [user, loading, segments]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return <Slot />;
});

export default RootLayout;
