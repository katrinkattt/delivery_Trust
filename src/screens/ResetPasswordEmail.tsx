import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from '../components/common/Button'
import { useNavigation } from '@react-navigation/native'
import AuthInput from '../components/common/AuthInput'
import Header from '../components/Header'

export default function ResetPasswordEmail() {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Header title="Восстановить пароль" />

            <AuthInput
                containerStyle={{ marginBottom: 17 }}
                label="E-mail"
                placeholder="Введите e-mail"
                keyboardType="email-address"
            />

            <Button onPress={() => navigation.navigate('ResetPasswordSave')} text="ВОССТАНОВИТЬ ПАРОЛЬ" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    resetPassword: {
        marginTop: 12,
        marginBottom: 16,
    },
    socialMediaButton: {
        width: 86,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.09)',
        borderWidth: 1,
        borderRadius: 5,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
})
