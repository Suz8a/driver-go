import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../components/Themed";
import { settings } from "../constants/Settings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const windowWidth = Dimensions.get("window").width;

export default function Settings() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Profile info</Text>
        </View>
        <View style={styles.section}>
          {settings.map(({ iconProps, route, title }, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.settingOptionContainer}>
                <Icon {...iconProps} />
                <Text style={styles.title}>{title}</Text>
              </View>
              {index !== settings.length - 1 && (
                <View style={styles.separator} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f6",
    paddingTop: 80,
  },
  sectionTitleContainer: {
    marginLeft: 10,
  },
  sectionTitle: {
    color: "#8C8D8B",
    fontSize: 16,
    fontWeight: "500",
  },
  section: {
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 20,
  },
  settingOptionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: "#343539",
    marginLeft: 10,
  },
  separator: {
    height: 1,
    width: windowWidth - 40,
    backgroundColor: "#DEDEE4",
    marginLeft: 40,
  },
});
