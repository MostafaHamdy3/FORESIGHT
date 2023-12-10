import React, { useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Colors } from "../../constants/config";
import Input from "../Input";
import Button from "../Button";
import { addNewUser, editUserDetails } from "../../store/actions/Users";
import DotPulse from "../DotPluse";

const ManageUser = ({ navigation, route }) => {

  const isEditing = route.params?.isEditing;
  const user = route.params?.user;
  const [firstName, setFirstName] = useState(isEditing ? user.firstname : "");
  const [lastName, setLastName] = useState(isEditing ? user.lastname : "");
  const [email, setEmail] = useState(isEditing ? user.email : "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(isEditing ? user.role : "");
  const [isActive, setIsActive] = useState(isEditing ? user.enabled : true);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    "DRIVER",
    "WORKER",
    "SITE_ENGINEER",
    "MONITORING_ENGINEER",
    "TECHNICAL_MANAGER",
    "BUSINESS_MANAGER",
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit user" : "Add new user",
    });
  }, [isEditing, navigation]);

  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  const AddUserHandler = async () => {
    try {
      setIsLoading(true);
      const userData = {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        role,
        enabled: isActive,
      };
      await addNewUser(userData);
      clearInputs();
    } catch(err) {
      console.log("AddUserHandler ===>", err);
    } finally {
      navigation.goBack();
      setIsLoading(false);
    }
  };

  const EditUserHandler = async () => {
    try {
      setIsLoading(true);
      const id = user.id;
      const newUserData = {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        role,
        enabled: isActive,
      };
      await editUserDetails(id, newUserData);
      clearInputs();
    } catch (err) {
      console.log("EditUserHandler ==>", err)
    } finally {
      navigation.goBack();
      setIsLoading(false);
    }
  };

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const selectRole = (item) => {
    setRole(item);
    setIsVisible(false);
  };

  return (
    <View style={styles.modalView}>
      <View style={styles.modalContent}>
        <View style={styles.userName}>
          <View style={{ width: "45%" }}>
            <Input
              label="First Name"
              value={firstName}
              onUpdateValue={(text) => setFirstName(text)}
            />
          </View>
          <View style={{ width: "45%" }}>
            <Input
              label="Last Name"
              value={lastName}
              onUpdateValue={(text) => setLastName(text)}
            />
          </View>
        </View>
        <Input
          label="Email Address"
          value={email}
          onUpdateValue={(text) => setEmail(text)}
        />
        {!isEditing && (
          <Input
            label="Password"
            // secure={isSecure}
            value={password}
            onUpdateValue={(text) => setPassword(text)}
          />
        )}

        <TouchableOpacity
          // onLayout={(event) => this.getLayout(event.nativeEvent.layout)}
          onPress={toggle}
          activeOpacity={1}
          style={[styles.dropDown, { height: 46, marginTop: 12 }]}
        >
          <View style={styles.arrow}>
            {!isVisible ? (
              <Image source={require("../../assets/expand_more.png")} />
            ) : (
              <Image source={require("../../assets/expand_more_up.png")} />
            )}
          </View>
          <View style={[styles.dropDownDisplay]}>
            <Text style={styles.labelStyle}>{role}</Text>
          </View>
          <View style={styles.inLineLabelView}>
            <Text>Role</Text>
          </View>
        </TouchableOpacity>

        {isVisible && (
          <View style={styles.dropDown}>
            <ScrollView
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true}
              style={{ width: "100%" }}
              nestedScrollEnabled={true}
            >
              {roles.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectRole(item)}
                  style={styles.dropDownItem}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        {isEditing && (
          <View style={styles.checkedContent}>
            <TouchableOpacity onPress={() => setIsActive(!isActive)}>
              <Ionicons
                name={isActive ? "checkbox" : "square-outline"}
                size={20}
                color={isActive ? Colors.primary : Colors.grey}
                style={{ marginRight: 4 }}
              />
            </TouchableOpacity>
            <Text>Enable the activation of the user</Text>
          </View>
        )}

        <View style={styles.btn}>
          <Button
            onPress={() => (isEditing ? EditUserHandler() : AddUserHandler())}
            backgroundColor={Colors.primary}
          >
            {isLoading ? <DotPulse /> : isEditing ? "Edit User" : "Add User"}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
  },
  modalContent: {
    width: "100%",
    padding: 16,
    marginTop: 16,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
  },
  userName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: 8,
  },
  dropDownDisplay: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexGrow: 1,
  },
  labelStyle: {
    flex: 1,
    marginRight: 16,
    justifyContent: "center",
    textAlign: "right",
    color: Colors.black,
  },
  inLineLabelView: {
    marginRight: -36,
  },
  dropDown: {
    width: "100",
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: Colors.borderColor,
    zIndex: 100,
  },
  dropDownItem: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 6,
  },
  checkedContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  btn: {
    width: "50%",
    marginTop: 24,
    marginLeft: 168,
  },
});

export default ManageUser;
