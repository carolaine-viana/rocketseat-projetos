import React from 'react';
import {TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    skill?: string;
}

// extends = vai ter todas as propriedades do touchopacity + minhas proprias tipagens.

//...rest = e todas as prorpiedades que vir do botao props.

export function Button({ skill, title, ...rest }: ButtonProps){
    return(
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            {...rest}
        >
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#A370F7',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
})