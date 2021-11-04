import React, {useEffect, useState} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillDate{ //dados da skill. objeto que contem toda as propriedades da sua habilidade nova (newSkill)
    id: string; //id da habilidade
    name: string; //nome da habilidade. ex: node.js
    date?: Date; //data que a habilidade foi cadastrada no sistema. ? preenchimento opcional
}

export function Home() {
    const [newSkill, setNewSkill] = useState(''); //string vazia
    const [mySkills, setMySkills] = useState<SkillDate[]>([]); //o mySkills é um array do skilldata (mySkill)
    const [greeting, setGretting] = useState('');

    function handleAddNewSkill(){

        const data = {
            id: String(new Date().getTime()), //prenchi o id. vai ser a data que vc cadastrou.
            name: newSkill //prenchi o nome. a data nao pq é opcional.
        }

        //console.log("new skill", data)
        
        setMySkills(oldState => [...oldState, data])
        //setMySkills([... mySkills, newSkill]).
        // SkillDate = mySkills. 
    }

    function handleRemoveSkill(id: string){
        setMySkills(mySkills => mySkills.filter(
            skill => skill.id !== id //quero pegar somente as ids que o id for diferente desse id seleciondo
        ))
    }

    //toda vez que o my skills mudar o use effect vai ser executado novamente
    useEffect(() => {
        const currentHour = new Date().getHours();
        console.log(currentHour)
        if(currentHour < 12){
            setGretting('Good morning')
        } else if(currentHour >= 12 && currentHour < 18){
            setGretting('Good afternoon')
        }else{
            setGretting('Good night')
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome, Carolaine
            </Text>

            <Text style={styles.greetings}>
                {greeting}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />

           <Button
                onPress={handleAddNewSkill}
                title="Add"
           />

            <Text style={[styles.title, {marginVertical: 50}]}>
                My Skills
            </Text>

            {/* to percorrendo o array */}

              <FlatList
                data={mySkills} //meu array
                keyExtractor={item => item.id} //cada item vai ser a propria chave
                renderItem={({item}) =>(
                    <View>
                        <SkillCard
                            skill={item.name}
                            // onPress={() => handleRemoveSkill(item.id)}
                            />
                        <Button
                            title="Remove"
                            skill={item.id}
                            onPress={() => handleRemoveSkill(item.id)}
                            style={[styles.button, {backgroundColor: 'red'}]}
                        />
                    </View>
                    )}
              />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1F1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 12,
        marginTop: 30,
        borderRadius: 7,
    },
    greetings: {
        color: '#FFF',
        fontSize: 20,
    },

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