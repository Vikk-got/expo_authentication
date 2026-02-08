import { Tabs, Redirect } from 'expo-router';
import { Platform, View, ActivityIndicator } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    display: 'flex',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    height: Platform.OS === 'android' ? 60 : 80,
                    paddingBottom: Platform.OS === 'android' ? 10 : 30,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false, // Ensure header is hidden for the dashboard
                    title: 'Dashboard',
                    tabBarLabel: 'Dashboard',
                }}
            />
        </Tabs>
    );
}
