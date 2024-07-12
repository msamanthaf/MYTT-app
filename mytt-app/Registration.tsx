import React, { Component } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-check-box';
import ModalDropdown from 'react-native-modal-dropdown';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = { navigation: StackNavigationProp<any>; };

type State = {
    guardianName: string,
    guardianEmail: string,
    childFirstName: string,
    childLastName: string,
    childAge: number,
    gender: string | null,
    preferredLanguage: string | null,
    phoneNumber: string,
    city: string,
    zip: string,
    agreeLiability: boolean,
    optInMarketingEmails: boolean,
};

export default class RegistrationScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            guardianName: '',
            guardianEmail: '',
            childFirstName: '',
            childLastName: '',
            childAge: 6,
            gender: null,
            preferredLanguage: null,
            phoneNumber: '',
            city: '',
            zip: '',
            agreeLiability: false,
            optInMarketingEmails: false,
        };
    }

    submitPressed = () => {
        console.log("Submitting registration:", this.state);

        // Prepare the data for sending
        const formData = {
            guardianName: this.state.guardianName,
            guardianEmail: this.state.guardianEmail,
            childFirstName: this.state.childFirstName,
            childLastName: this.state.childLastName,
            childAge: this.state.childAge,
            gender: this.state.gender,
            preferredLanguage: this.state.preferredLanguage,
            phoneNumber: this.state.phoneNumber,
            city: this.state.city,
            zip: this.state.zip,
            agreeLiability: this.state.agreeLiability,
            optInMarketingEmails: this.state.optInMarketingEmails,
        };

        const body = JSON.stringify(formData);

        try {
            fetch('http://172.20.10.2:3000/process-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                Alert.alert("Success", "Registration submitted successfully.");
                Keyboard.dismiss();
            })
            .catch((error) => {
                // Ignore errors silently
            });
        } catch (error) {
            // Ignore errors silently
        }
		this.props.navigation.navigate('Payment');
    };

    render() {
        return (
            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                enableOnAndroid={true}
            >
                <View style={styles.header}>
                    <Text style={styles.headerText}>Register</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>Child Information</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="First Name"
                            style={styles.textInput}
                            onChangeText={childFirstName => this.setState({ childFirstName })}
                            value={this.state.childFirstName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Last Name"
                            style={styles.textInput}
                            onChangeText={childLastName => this.setState({ childLastName })}
                            value={this.state.childLastName}
                        />
                    </View>

                    <View style={styles.ageContainer}>
                        <Text style={styles.ageLabel}>Age:</Text>
                        <View style={styles.ageInput}>
                            <Button title="-" onPress={() => this.setState(prevState => ({ childAge: Math.max(prevState.childAge - 1, 6) }))} />
                            <Text style={styles.ageText}>{this.state.childAge}</Text>
                            <Button title="+" onPress={() => this.setState(prevState => ({ childAge: Math.min(prevState.childAge + 1, 18) }))} />
                        </View>
                    </View>

					<View style={styles.ageContainer}>
					<Text style={styles.ageLabel}>Gender:</Text>
					<View style={styles.inputTextWrapper}>
                        <ModalDropdown
                            options={['Male', 'Female', 'Transgender', 'Non-binary', 'Prefer not to specify']}
                            defaultValue="Select Gender"
                            textStyle={styles.dropdownText}
                            dropdownStyle={styles.dropdownContainer}
                            onSelect={(index, value) => this.setState({ gender: value })}
                        />
                    </View>
					</View>

					<View style={styles.ageContainer}>
					<Text style={styles.ageLabel}>Language:</Text>
					<View style={styles.inputTextWrapper}>
                        <ModalDropdown
                            options={['English', 'Spanish', 'French', 'Mandarin', 'Other']}
                            defaultValue="Select Preferred Language"
                            textStyle={styles.dropdownText}
                            dropdownStyle={styles.dropdownContainer}
                            onSelect={(index, value) => this.setState({ preferredLanguage: value })}
                        />
                    </View>
					</View>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>Guardian Information</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Guardian Name"
                            style={styles.textInput}
                            onChangeText={guardianName => this.setState({ guardianName })}
                            value={this.state.guardianName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Guardian Email"
                            style={styles.textInput}
                            onChangeText={guardianEmail => this.setState({ guardianEmail })}
                            value={this.state.guardianEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Phone Number"
                            style={styles.textInput}
                            onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            value={this.state.phoneNumber}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="City"
                            style={styles.textInput}
                            onChangeText={city => this.setState({ city })}
                            value={this.state.city}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Zip"
                            style={styles.textInput}
                            onChangeText={zip => this.setState({ zip })}
                            value={this.state.zip}
                        />
                    </View>

                    <View style={styles.checkbox}>
                        <CheckBox
                            style={{ flex: 1, padding: 10 }}
                            onClick={() => this.setState({ agreeLiability: !this.state.agreeLiability })}
                            isChecked={this.state.agreeLiability}
                            leftText="Do you agree to the Liability Waiver?"
                        />
                    </View>

                    <View style={styles.checkbox}>
                        <CheckBox
                            style={{ flex: 1, padding: 10 }}
                            onClick={() => this.setState({ optInMarketingEmails: !this.state.optInMarketingEmails })}
                            isChecked={this.state.optInMarketingEmails}
                            leftText="Opt in for marketing emails?"
                        />
                    </View>

                    <View style={styles.btnContainer}>
                        <Button title="Proceed to Payment" onPress={this.submitPressed} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    formContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    sectionHeader: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 5,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 16,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    ageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    ageLabel: {
        fontSize: 16,
        marginRight: 10,
    },
    ageInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ageText: {
        fontSize: 16,
        paddingHorizontal: 10,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    btnContainer: {
        marginTop: 20,
    },
    dropdownText: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
    },
    dropdownStyle: {
        marginTop: 2,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCCCCC',
    },
	inputTextWrapper: {
        width: '100%',
        marginBottom: 16,
    },
	dropdownContainer: {
        width: '100%',
        maxHeight: 150,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
});
