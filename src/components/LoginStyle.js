import  { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',

       backgroundColor: '#FFF'
    },
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image : {
      marginBottom: 35,
      width: 300,
      height: 80
    },
    input: {
      width: 250,
      color: '#000',
      padding: 5,
      marginTop: 5,
      height: 50,
      borderColor: '#3499C0',
      borderWidth: 1,
      borderRadius: 4,
      alignSelf: 'center',
      backgroundColor: '#FFF'
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#328FE6',
      padding: 10,
      height: 50,
      marginTop: 13,
      backgroundColor: '#FFF'
    },
    label: {
      width: 230,
      flex: 1,
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
      color: '#00A4E4'
    }
});

export default loginStyle;
