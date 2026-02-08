import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    ScrollView,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithCredential,
} from 'firebase/auth';
import { auth } from '../../src/config/firebaseConfig';
import { Link } from 'expo-router';
import { CustomButton } from '../../src/components/CustomButton';
import { CustomInput } from '../../src/components/CustomInput';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
        androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            setLoading(true);
            signInWithCredential(auth, credential)
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [response]);

    const handleLogin = React.useCallback(async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError('Invalid email or password');
            setLoading(false);
        }
    }, [email, password]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Enter your details to continue</Text>
                </View>

                {error && <View style={styles.errorContainer}><Text style={styles.errorText}>{error}</Text></View>}

                <View style={styles.form}>
                    <CustomInput
                        label="Email"
                        placeholder="example@mail.com"
                        value={email}
                        onChangeText={(t) => { setEmail(t); setError(null); }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <CustomInput
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={(t) => { setPassword(t); setError(null); }}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.forgotPass}>
                        <Text style={styles.forgotPassText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <CustomButton
                        title="Sign In"
                        onPress={handleLogin}
                        loading={loading}
                    />

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>or continue with</Text>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity
                        style={styles.googleButton}
                        onPress={() => promptAsync()}
                        disabled={!request || loading}
                    >
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>New here? </Text>
                    <Link href="/signup" asChild>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Create Account</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
    },
    form: {
        flex: 1,
    },
    errorContainer: {
        backgroundColor: '#FFE5E5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '600',
    },
    forgotPass: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPassText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E5EA',
    },
    dividerText: {
        marginHorizontal: 12,
        color: '#8E8E93',
        fontSize: 13,
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#F2F2F7',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    googleButtonText: {
        color: '#1C1C1E',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    footerText: {
        color: '#8E8E93',
        fontSize: 15,
    },
    linkText: {
        color: '#007AFF',
        fontSize: 15,
        fontWeight: '700',
    },
});
