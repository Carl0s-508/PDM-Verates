import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type Props = {
  source: ImageSourcePropType;
  text: string;
  onPress: (event: GestureResponderEvent) => void;
};

export default function SocialButton({ source, text, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={source} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  text: {
    fontSize: 13,
    color: "#333",
  },
});
