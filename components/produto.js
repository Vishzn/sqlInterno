import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Produto({ data, onDelete, onSelect, selecionado }) {
  return (
    <Pressable
      style={[styles.container, selecionado && styles.selecionado]}
      onPress={() => onSelect(data)}
    >
      <Text style={styles.text}>
        {data.quantidade} - {data.nome}
      </Text>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CECECE",
    padding: 24,
    borderRadius: 5,
    gap: 12,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selecionado: {
    borderColor: "#4CAF50", // verde quando selecionado
  },
  text: {
    flex: 1,
  },
});
    