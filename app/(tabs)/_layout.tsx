import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { useModalType } from "../../context/modalContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { setModalType } = useModalType();

  const navigateToDefaultModal: () => void = () => {
    setModalType("default");
    router.push("/modal");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="home"
              size={28}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
          headerRight: () => (
            <Pressable onPress={navigateToDefaultModal}>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Sources",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="folder1"
              size={24}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
