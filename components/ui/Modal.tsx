import { Modal as DefaultModal, StyleSheet, View } from "react-native";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <DefaultModal
      onRequestClose={onClose}
      backdropColor="rgba(0, 0, 0, 0.5)"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[styles.container, styles.modalContainer]}>
          {children}
        </View>
      </View>
    </DefaultModal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    padding: 20,
    minHeight: 200,
    borderRadius: 10,
  },
});
