import React, {Component, createRef, RefObject} from 'react';
import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-check-box';
import {Picker} from '@react-native-picker/picker';
type Props = {};

type State = {
    firstName: string,
    lastName: string,
    email: string;
    marketingEmails: boolean,
    childFirstName: string,
    childLastName: string,
    childAge: number, // TODO: turn this into an enum
    childEthnicity: string, // TODO: turn this into an enum
    liabilityWaiver: boolean,
    phone: string,
    city: string,
    zip: string,
    hearAboutUs: string, // TODO: turn this into an enum
    emergencyContactName: string,
    emergencyContactPhone: string,
    emergencyContactRelationship: string, // TODO: enum
    isAgeDropdownFocused: boolean,
    activeIndex: number | null;
};

export default class RegistrationScreen extends Component<Props, State> {
    firstNameInputRef: RefObject<TextInput>;
    lastNameInputRef: RefObject<TextInput>;
    emailInputRef: RefObject<TextInput>;
    marketingEmailsRef: RefObject<TextInput>;
    childFirstNameRef: RefObject<TextInput>;
    childLastNameRef: RefObject<TextInput>;
    childAgeRef: RefObject<TextInput>;
    childEthnicityRef: RefObject<TextInput>;
    liabilityWaiverRef: RefObject<TextInput>;
    phoneRef: RefObject<TextInput>;
    cityRef: RefObject<TextInput>;
    zipRef: RefObject<TextInput>;
    hearAboutUsRef: RefObject<TextInput>;
    emergencyContactNameRef: RefObject<TextInput>;
    emergencyContactPhoneRef: RefObject<TextInput>;
    emergencyContactRelationshipRef: RefObject<TextInput>;

    _scrollViewRef: RefObject<KeyboardAwareScrollView>;

    constructor(props: Props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            marketingEmails: false,
            childFirstName: '',
            childLastName: '',
            childAge: 9,
            childEthnicity: '',
            liabilityWaiver: false,
            phone: '',
            city: '',
            zip: '',
            hearAboutUs: '',
            emergencyContactName: '',
            emergencyContactPhone: '',
            emergencyContactRelationship: '',
            isAgeDropdownFocused: false,
            activeIndex: null,
        };
        this.submitPressed = this.submitPressed.bind(this);

        this.firstNameInputRef = createRef<TextInput>();
        this.lastNameInputRef = createRef<TextInput>();
        this.emailInputRef = createRef<TextInput>();
        this.marketingEmailsRef = createRef<TextInput>();
        this.childFirstNameRef = createRef<TextInput>();
        this.childLastNameRef = createRef<TextInput>();
        this.childAgeRef = createRef<TextInput>();
        this.childEthnicityRef = createRef<TextInput>();
        this.liabilityWaiverRef = createRef<TextInput>();
        this.phoneRef = createRef<TextInput>();
        this.cityRef = createRef<TextInput>();
        this.zipRef = createRef<TextInput>();
        this.hearAboutUsRef = createRef<TextInput>();
        this.emergencyContactNameRef = createRef<TextInput>();
        this.emergencyContactPhoneRef = createRef<TextInput>();
        this.emergencyContactRelationshipRef = createRef<TextInput>();

        this._scrollViewRef = createRef<KeyboardAwareScrollView>()
    }

    inputs = () => {
        return [
            this.firstNameInputRef,
            this.lastNameInputRef,
            this.emailInputRef,
            this.marketingEmailsRef,
            this.childFirstNameRef,
            this.childLastNameRef,
            this.childAgeRef,
            this.childEthnicityRef,
            this.liabilityWaiverRef,
            this.phoneRef,
            this.cityRef,
            this.zipRef,
            this.hearAboutUsRef,
            this.emergencyContactNameRef,
            this.emergencyContactPhoneRef,
            this.emergencyContactRelationshipRef,
        ];
    };

    editNextInput = () => {
        console.log("editNextInput")
        if (this.state.activeIndex === -1) {
            return;
        }

        if (this.state.activeIndex !== null) {
            const nextIndex = this.state.activeIndex + 1;
            if (nextIndex < this.inputs().length && this.inputs()[nextIndex].current != null) {
                this.setFocus(this.inputs()[nextIndex], true);
            } else {
                this.finishEditing();
            }
        }
    }

    onInputFocus = () => {
        this.setState({
            activeIndex: this.getActiveInputIndex(),
        });
    }

    onChangeInputHandler = (field: keyof State) => (value: string) => {
        this.setState({[field]: value} as unknown as Pick<State, keyof State>);
    }

    getActiveInputIndex = () => {
        const activeIndex = this.inputs().findIndex((input) => {
            if (input.current == null) {
                return false;
            }
            console.log("input: ", input);
            return input.current.isFocused();
        });
        console.log("activeIndex: ", activeIndex);
        return activeIndex;
    }

    finishEditing = () => {
        const activeIndex = this.getActiveInputIndex();
        if (activeIndex === -1) {
            return;
        }
        this.setFocus(this.inputs()[activeIndex], false);
    }

    setFocus(textInputRef: RefObject<TextInput>, shouldFocus: boolean) {
        if (shouldFocus) {
            setTimeout(() => {
                textInputRef.current?.focus();
            }, 100);
        } else {
            textInputRef.current?.blur();
        }
    }

    submitPressed() {
        console.log("Submitting registration:", this.state);
    
        // Prepare the data for sending
        const formData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            marketingEmails: this.state.marketingEmails,
            childFirstName: this.state.childFirstName,
            childLastName: this.state.childLastName,
            childAge: this.state.childAge,
            childEthnicity: this.state.childEthnicity,
            liabilityWaiver: this.state.liabilityWaiver,
            phone: this.state.phone,
            city: this.state.city,
            zip: this.state.zip,
            hearAboutUs: this.state.hearAboutUs,
            emergencyContactName: this.state.emergencyContactName,
            emergencyContactPhone: this.state.emergencyContactPhone,
            emergencyContactRelationship: this.state.emergencyContactRelationship,
        };
    
		const body = JSON.stringify(formData)
		console.log("===============================================",body)
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
            // Handle success
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle error
          });
        Keyboard.dismiss();
    }

    render() {
        return (
            <KeyboardAwareScrollView
                style={styles.container}
                contentOffset={{ x: 0, y: 24 }}
                ref={this._scrollViewRef}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: 24 }}
                contentInsetAdjustmentBehavior="always"
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                enableOnAndroid={true}
                extraHeight={32}
                extraScrollHeight={Platform.OS == "android" ? 32 : 0}
                enableResetScrollToCoords={false}
            >
                <View style={styles.container}>

                    <Text style={styles.header}>Registration</Text>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="First Name (required)"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('firstName')}
                            ref={this.firstNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Last Name (required)"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('lastName')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Email (required)"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('email')}
                            ref={this.emailInputRef}
                            value={this.state.email}
                        />
                    </View>

                    <Text style={styles.subtext}>This will be used for your confirmation email.</Text>

                    <CheckBox
                        style={{flex: 1, padding: 10}}
                        onClick={()=>{
                            this.setState({
                                marketingEmails:!this.state.marketingEmails
                            })
                        }}
                        isChecked={this.state.marketingEmails}
                        leftText={"Opt Into Marketing Emails?"}
                    />

                    <Text style={styles.subheader}>Child Registration</Text>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="First Name"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('childFirstName')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Last Name"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('childLastName')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <Text style={styles.subtext}>Child Age</Text>

                    <Picker
                        selectedValue={this.state.childAge}
                        onValueChange={(item) =>
                            this.setState({
                                childAge: Number(item),
                            })
                        }
                    >
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                    </Picker>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Ethnicity"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('childEthnicity')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <CheckBox
                        style={{flex: 1, padding: 10}}
                        onClick={()=>{
                            this.setState({
                                liabilityWaiver:!this.state.liabilityWaiver
                            })
                        }}
                        isChecked={this.state.liabilityWaiver}
                        leftText={"Do you agree to the Liability Waiver?"}
                    />

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Phone Number"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('phone')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="City"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('city')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Zip"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('zip')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="How did you hear about us?"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('hearAboutUs')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Emergency Contact Name"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('emergencyContactName')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Emergency Contact Phone Number"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('emergencyContactPhone')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Emergency Contact's Relationship to Child"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('emergencyContactRelationship')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.btnContainer}>
                        <Button title="Submit" onPress={this.submitPressed} />
                    </View>

                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({ // TODO: update styling
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 100,
    },
    header: {
        fontSize: 36,
        padding: 24,
        margin: 12,
        textAlign: "center",
    },
    subheader: {
        fontSize: 24,
        padding: 24,
        margin: 12,
        textAlign: "center",
    },
    subtext: {
        fontSize: 12,
        padding: 4,
        margin: 4,
        textAlign: "center",
    },
    inputTextWrapper: {
        marginBottom: 24,
    },
    checkboxContainer: {
        marginBottom: 24,
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        paddingRight: 30,
    },
    errorText: {
        color: 'red',
        fontSize: 10,
    },
    btnContainer: {
        backgroundColor: "white",
        marginTop:36,
    }
});
