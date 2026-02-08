import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../src/config/firebaseConfig';
import { CustomButton } from '../../src/components/CustomButton';

export default function Dashboard() {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return unsubscribe;
    }, []);

    const handleLogout = React.useCallback(async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.content}>
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                    </View>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.emailText}>{user?.email}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Status</Text>
                        <Text style={styles.statValue}>Verified</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>Plan</Text>
                        <Text style={styles.statValue}>Free</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <CustomButton
                        title="Log Out"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                    />
                    <Text style={styles.versionText}>Version 1.0.0</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 40,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    avatarText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 16,
        color: '#8E8E93',
        marginBottom: 4,
    },
    emailText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    statCard: {
        backgroundColor: '#fff',
        flex: 0.48,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statLabel: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },
    footer: {
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        shadowColor: '#FF3B30',
    },
    versionText: {
        textAlign: 'center',
        color: '#C7C7CC',
        marginTop: 16,
        fontSize: 12,
    },
});
