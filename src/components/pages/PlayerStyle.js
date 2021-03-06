import {StyleSheet} from 'react-native';

const PlayerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    controls: {
        opacity: 90,
        borderRadius: 5,
        position: 'absolute',
        bottom: 25,
        left: 25,
        right: 25
    },
    progress: {
        flex: 1,
        marginTop: 5,
        flexDirection: 'row',
        borderRadius: 3,
        height: 3,
        overflow: 'hidden'
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#00A4E4'
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C'
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10
    },
    playerControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12
    }
});

export default PlayerStyles;
