import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  View,
  Animated,
  Pressable,
} from "react-native";
import { Text, Surface, TouchableRipple, Appbar } from "react-native-paper";
import { router } from "expo-router";
import { useRef, useState } from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { t } = useTranslation();
  const menuItems = [
    { label: t("menuInventory"), color: "#e8f5e9", route: "/inventory" },
    { label: t("menuReceiving"), color: "#fff9c4" },
    { label: t("menuOrderPick"), color: "#e3f2fd" },
    { label: t("menuReturn"), color: "#fce4ec" },
    { label: t("menuTransfer"), color: "#f3e5f5" },
    { label: t("menuRepricing"), color: "#e0f7fa" },
    { label: t("menuBarcodeCollection"), color: "#fff3e0" },
    { label: t("menuReferences"), color: "#ede7f6", route: "/brands" },
    { label: t("menuNomenclature"), color: "#e8eaf6", route: "/nomenclature" },
  ];

  const [menuVisible, setMenuVisible] = useState(false);
  const [isKazakh, setIsKazakh] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const toggleLang = () => {
    const newLang = isKazakh ? "ru" : "kz";
    setIsKazakh(!isKazakh);
    i18n.changeLanguage(newLang);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" color="#fff" onPress={openMenu} />
        <Appbar.Content title="Магазин 15" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <Modal visible={menuVisible} transparent animationType="none">
        <View style={styles.menuOverlay}>
          <Animated.View
            style={[
              styles.menuDrawer,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <Text style={styles.drawerTitle}>{t("settings")}</Text>
            <View style={styles.langRow}>
              <Text style={styles.langLabel}>РУС</Text>
              <Switch
                value={isKazakh}
                onValueChange={toggleLang}
                color="#b71c1c"
              />
              <Text style={styles.langLabel}>ҚАЗ</Text>
            </View>
          </Animated.View>
          <Pressable style={{ flex: 1 }} onPress={closeMenu}>
            <View />
          </Pressable>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.menu}>
        {menuItems.map((item, index) => (
          <Surface
            key={index}
            style={[styles.surface, { backgroundColor: item.color }]}
            elevation={2}
          >
            <TouchableRipple
              onPress={() => item.route && router.push(item.route)}
              rippleColor="rgba(0,0,0,0.1)"
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableRipple>
          </Surface>
        ))}

        <Surface style={styles.syncSurface} elevation={2}>
          <TouchableRipple onPress={() => {}} rippleColor="rgba(0,0,0,0.1)">
            <Text style={styles.syncText}>{t("serverSync")}</Text>
          </TouchableRipple>
        </Surface>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>оператор</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { backgroundColor: "#b71c1c" },
  headerTitle: { color: "#fff", fontWeight: "bold" },
  menu: { padding: 12, gap: 8 },
  surface: { borderRadius: 10 },
  menuText: { fontSize: 16, color: "#333", padding: 18 },
  syncSurface: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: 8,
  },
  syncText: { fontSize: 16, color: "#555", padding: 18, textAlign: "center" },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  footerText: { color: "#888", fontSize: 13 },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
  },
  menuDrawer: {
    backgroundColor: "#fff",
    width: "70%",
    height: "100%",
    padding: 24,
    paddingTop: 40,
    borderBottomRightRadius: 20,
    elevation: 8,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  langRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  langLabel: { fontSize: 16, color: "#333", fontWeight: "600" },
});
