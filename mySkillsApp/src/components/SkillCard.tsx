import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps} from 'react-native';

interface SkillCardProps extends TouchableOpacityProps {
    skill: string;
}

export function SkillCard({skill, ...rest}: SkillCardProps){ //peguei a skill do home
    return(
        <TouchableOpacity
            style={styles.buttonSkill}
            {...rest}
        >
            <Text style={styles.TextSkill}>
                {/* renderizei aqui */}
                {skill}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#1F1E25',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 10,
    },
    TextSkill: {
        color: '#FFF',
        backgroundColor: '#1F1e25',
        padding: 15,
        fontSize: 22,
        fontWeight: 'bold',
        borderRadius: 20,
    }
})