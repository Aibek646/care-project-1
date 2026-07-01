import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Surface, TouchableRipple, Appbar } from "react-native-paper";
import { router } from "expo-router";

const menuItems = [
  { label: "Поступление", color: "#e8f5e9", route: "/receiving" },
  { label: "Инвентаризация", color: "#fff9c4" },
  { label: "Подбор заказа", color: "#e3f2fd" },
  { label: "Возврат", color: "#fce4ec" },
  { label: "Перемещение", color: "#f3e5f5" },
  { label: "Переоценка", color: "#e0f7fa" },
  { label: "Сбор штрихкодов", color: "#fff3e0" },
  { label: "Просмотр справочников", color: "#ede7f6" },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" color="#fff" onPress={() => {}} />
        <Appbar.Content title="Магазин 15" titleStyle={styles.headerTitle} />
      </Appbar.Header>

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
            <Text style={styles.syncText}>Обмен с сервером</Text>
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
});
