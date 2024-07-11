import React, {Component, createRef, RefObject} from 'react';
import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


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
    phone: number,
    city: string,
    zip: string,
    hearAboutUs: string, // TODO: turn this into an enum
    emergencyContactName: string,
    emergencyContactPhone: number,
    emergencyContactRelationship: string, // TODO: enum
    activeIndex: number | null;
    // showEmailError: boolean;
    // showPasswordError: boolean;
    // showFirstnameError: boolean;
    // showLastnameError: boolean;
    // showOccupationError: boolean;
    // showAddressError: boolean;
    // showZipError: boolean;
    // showPhoneError: boolean;
};



export default class RegistrationScreen extends Component<{}, State> {
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

    constructor(props: {}) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            marketingEmails: false,
            childFirstName: '',
            childLastName: '',
            childAge: 0,
            childEthnicity: '',
            liabilityWaiver: false,
            phone: 0,
            city: '',
            zip: '',
            hearAboutUs: '',
            emergencyContactName: '',
            emergencyContactPhone: 0,
            emergencyContactRelationship: '',

            activeIndex: null,

            // showEmailError: false,
            // showPasswordError: false,
            // showFirstnameError: false,
            // showLastnameError: false,
            // showOccupationError: false,
            // showAddressError: false,
            // showZipError: false,
            // showPhoneError: false,
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
        const activeIndex = this.getActiveInputIndex();
        if (activeIndex === -1) {
            return;
        }

        const nextIndex = activeIndex + 1;
        if (nextIndex < this.inputs().length && this.inputs()[nextIndex].current != null) {
            this.setFocus(this.inputs()[nextIndex], true);
        } else {
            this.finishEditing();
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
        console.log("submitPressed this.state: ", this.state);
        // this.setState({
        //     showEmailError: this.state.email.length < 4,
        //     showPasswordError: this.state.password.length < 4,
        //     showFirstnameError: this.state.firstname.length < 4,
        //     showLastnameError: this.state.lastname.length < 4,
        //     showOccupationError: this.state.occupation.length < 4,
        //     showAddressError: this.state.address.length < 4,
        //     showZipError: this.state.zip.length < 4,
        //     showPhoneError: this.state.phone.length < 4,
        // });
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
                // onKeyboardDidShow={this._keyboardDidShowHandler}
            >
                <View style={styles.container}>

                    <Text style={styles.header}>Registration</Text>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Email"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('email')}
                            ref={this.emailInputRef}
                            value={this.state.email}
                        />
                        {/*{this.state.showEmailError*/}
                        {/*    <Text style={styles.errorText}>Please enter your email address.</Text>*/}
                        {/*}*/}
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="First Name"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('firstName')}
                            ref={this.firstNameInputRef}
                        />
                        {/*{this.state.showFirstnameError &&*/}
                        {/*    <Text style={styles.errorText}>Please enter your first name.</Text>*/}
                        {/*}*/}
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Last Name"
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
                            placeholder="Marketing Emails - CHANGE TO CHECKBOX "
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('marketingEmails')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Child First Name"
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
                            placeholder="Child Last Name"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('childLastName')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Child Age"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('childAge')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Child Ethnicity"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('childEthnicity')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

                    <View style={styles.inputTextWrapper}>
                        <TextInput
                            placeholder="Liability Waiver"
                            style={styles.textInput}
                            returnKeyType="next"
                            onSubmitEditing={this.editNextInput}
                            onFocus={this.onInputFocus}
                            onChangeText={this.onChangeInputHandler('liabilityWaiver')}
                            ref={this.lastNameInputRef}
                        />
                    </View>

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
                            placeholder="How did you hear about us? - CHANGE TO BIG TEXT BOX"
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

const styles = StyleSheet.create({
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
    inputTextWrapper: {
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