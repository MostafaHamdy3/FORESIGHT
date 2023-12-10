import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/config";

const Search = () => {
  const [searchableText, setSearchableText] = useState("");
  const [placeholderColor, setPlaceholderColor] = useState(Colors.borderColor);

  handleFocus = () => {
    setPlaceholderColor(Colors.black);
  };

  handleBlur = () => {
    setPlaceholderColor(Colors.borderColor);
  };

  // loadListOfBehavior = async (keyword) => {
  //   await this.state.behaviorList.push(this.props.getBehaviorUsingSearch(keyword))
  //   return this.state.behaviorList;
  // }

  return (
    <View>
      <TouchableOpacity style={[styles.search, styles.shadow_sm]}>
        <Image
          source={require("../assets/Search.png")}
          style={{ width: 20, height: 20 }}
        />
        <TextInput
          style={styles.searchText}
          defaultValue={searchableText}
          placeholder="Search for userName ..."
          placeholderTextColor={placeholderColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(text) => {
            setSearchableText(text);
            // loadListOfBehavior(text);
          }}
          selectionColor={Colors.grey}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    width: "94%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderColor: Colors.borderColor,
    borderWidth: 0.5,
  },
  shadow_sm: {
    shadowColor: Colors.lightGrey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  searchText: {
    fontSize: 14,
    color: Colors.black,
    marginLeft: 8,
  },
});

export default Search;
