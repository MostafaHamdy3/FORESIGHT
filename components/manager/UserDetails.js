import { StyleSheet, Text, View } from "react-native";
import React from "react";

const UserDetails = ({ route }) => {
  const isEditing = route.params?.isEditing;
  const user = route.params?.user;

  return (
    <View>
      <Text>{user.firstname} {user.lastname}</Text>
      <Text>{user.email}</Text>
      <Text>{user.role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserDetails;

