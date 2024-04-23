// Library
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign, Ionicons } from "@expo/vector-icons";
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
      {/* <Tabs.Screen
        name="three"
        options={{
          title: "Stats",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="stats-chart-outline"
              size={24}
              color={color}
              style={{
                marginTop: 35,
                height: "100%",
              }}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="home"
              size={28}
              style={{ marginTop: 30, height: "100%" }}
              color={color}
            />
          ),
          headerRight: () => (
            <Pressable onPress={navigateToDefaultModal}>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={20}
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
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="folder1"
              size={24}
              color={color}
              style={{
                marginTop: 35,
                height: "100%",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
