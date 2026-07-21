import { View } from "react-native";
import { Button } from "react-native-paper";
import { useRef } from "react";
import handleScan from "@/utils/practice/logic";

const catalog = [
  { name: "ОРЕХ", barcode: "2275637" },
  { name: "ТУЧИКЕН", barcode: "2101834" },
  { name: "КНИГА", barcode: "9785977518185" },
];

export const practice = () => {
  const onFound = (document) => {};

  const isScanning = useRef(false);
  handleBarCodeScanned = ({ data }: { data: string }) => {
    handleScan({
      barcode,
      catalog,
      onFound,
      onNotFound,
    });
  };

  return (
    <View>
      <Button
        mode="contained"
        buttonColor="#b71c1c"
        textColor="#ffffff"
        style={{ flex: 1 }}
      >
        2275637004549
      </Button>
      <Button>2101834000018</Button>
      <Button>9785977518185</Button>
      <Button>2299999005555</Button>
    </View>
  );
};
