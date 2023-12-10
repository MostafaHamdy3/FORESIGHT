import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from 'react-redux';

import { Colors } from "../constants/config";
import Search from "../components/Search";
import { getUsers } from "../store/actions/Users";
import Indicator from './../components/Indicator';

const Manager = ({ navigation }) => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUserHandler = async () => {
    // setIsLoading(true)
    // try {
    //   users.filter((user) => user.id !== id);
    // } catch (err) {
    //   setError("Couldn't deleting the user! .. please try again later!");
    //   setIsLoading(false)
    // }
  };

  const editUserDetailsHandler = (user) => {
    navigation.navigate("ManageUser", {
      user,
      isEditing: true,
    });
  };

  const getAllUsers = async () => {
    try {
      const result = await dispatch(getUsers());
      setUsers(result);
    } catch (err) {
      console.log("getAllUsers ==>", err)
    }
  };
  getAllUsers();

  return (
    <View style={styles.container}>
      <Search />
      {isLoading && <Indicator />}
      <ScrollView style={{ marginTop: 12 }}>
        {users
          ?.filter((user) => user.role !== "ADMIN")
          ?.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.userContainer}
              onPress={() => editUserDetailsHandler(user)}
            >
              <View>
                <Text style={styles.nameTitle}>
                  {user.firstname} {user.lastname}
                </Text>
                {/* <Text style={styles.emailTitle}>{user.email}</Text> */}
              </View>
              <Text style={styles.roleTitle}>{user.role}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addUser}
        onPress={() => navigation.navigate("ManageUser")}
      >
        <Ionicons name="add" size={28} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  userContainer: {
    width: "96%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    // borderColor: Colors.borderColor,
    // borderWidth: 0.25,

    shadowColor: Colors.lightGrey,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  nameTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  emailTitle: {
    fontSize: 12,
    color: Colors.grey,
  },
  roleTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 4,
  },
  icons: {
    flexDirection: "row",
  },
  addUser: {
    position: "absolute",
    bottom: 36,
    right: 24,
    padding: 8,
    borderRadius: 32,
    backgroundColor: Colors.white,
    shadowColor: Colors.lightGrey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Manager;
