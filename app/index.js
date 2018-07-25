import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions, Constants } from 'expo';

export default class App extends React.Component {
    state = {
        hasCameraPermission: null
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermission: status === 'granted'
        })
    }

    _handleBarcodeRead = ({ type, data }) => {
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
        Alert.alert(
            'Scan successful!',
            `${type} and ${JSON.stringify(data)}`
        );
    }

    render() {

        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        else {
            return (
                <View style={styles.container}>
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarcodeRead}
                        style={styles.barcodeContainer}
                        torchMode="off"
                        type="back"
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    barcodeContainer: {
        height: 200,
        width: 200
    },
});
