import {StyleSheet} from 'react-native'
import { createElement } from 'react'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212121",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 100
    },
    texto :{
        fontSize: 16,
        color: "white",
        fontWeight: "bold"
    },
    listContainer: {
        backgroundColor: "#282828",

        alignItems: "center",
        justifyContent: "center",
        width: 250,
        borderRadius: 8,
        padding: 15
    },
    NewProjectButton: {
        padding: 15,
        marginBottom: 15,
        backgroundColor: "#7951ac",
        borderRadius: 8,
        margin: 15
    },

})


export default styles