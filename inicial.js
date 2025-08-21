import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { usarBD } from "./hooks/usarBD";
import { Produto } from "./components/produto";

export function Index() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const produtosBD = usarBD();

  async function create() {
    if (isNaN(quantidade)) {
      return Alert.alert("Quantidade", "A quantidade precisa ser um número!");
    }
    try {
      const item = await produtosBD.create({
        nome,
        quantidade: Number(quantidade),
      });
      Alert.alert("Produto cadastrado com o ID: " + item.idProduto);
      setId(item.idProduto);
      listar();
      limparCampos();
    } catch (error) {
      console.log(error);
    }
  }

  async function update() {
    if (!id) {
      return Alert.alert("Erro", "Selecione um produto para atualizar.");
    }
    try {
      await produtosBD.update({
        id,
        nome,
        quantidade: Number(quantidade),
      });
      Alert.alert("Produto atualizado com sucesso!");
      listar();
      limparCampos();
    } catch (error) {
      console.log(error);
    }
  }

  async function listar() {
    try {
      const captura = await produtosBD.read(pesquisa);
      setProdutos(captura);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listar();
  }, [pesquisa]);

  const remove = async (id) => {
    try {
      await produtosBD.remove(id);
      await listar();
      if (produtoSelecionado === id) {
        limparCampos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  function limparCampos() {
    setId("");
    setNome("");
    setQuantidade("");
    setProdutoSelecionado(null);
  }

  function handleSelect(produto) {
    setProdutoSelecionado(produto.id);
    setId(produto.id);
    setNome(produto.nome);
    setQuantidade(String(produto.quantidade));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.texto}
        placeholder="Nome"
        onChangeText={setNome}
        value={nome}
      />
      <TextInput
        style={styles.texto}
        placeholder="Quantidade"
        onChangeText={setQuantidade}
        value={quantidade}
      />
      <Button title="Salvar" onPress={create} />
      <Button title="Atualizar" onPress={update} disabled={!id} />
      <TextInput
        style={styles.texto}
        placeholder="Pesquisar"
        onChangeText={setPesquisa}
      />
      <FlatList
        contentContainerStyle={styles.listContent}
        data={produtos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Produto
            data={item}
            selecionado={item.id === produtoSelecionado}
            onSelect={handleSelect}
            onDelete={() => remove(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  texto: {
    height: 54,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#999",
    paddingHorizontal: 16,
  },
  listContent: {
    gap: 16,
  },
});
