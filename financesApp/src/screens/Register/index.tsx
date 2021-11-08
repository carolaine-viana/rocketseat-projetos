import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert} from "react-native";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Form/Button";
import { CategoryelectButton } from "../../components/Form/CategoryelectButton";
import { Input } from "../../components/Form/Input";
import { InputForm } from "../../components/Form/InputForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor número')
    .positive('O valor nao pode ser negativo!')
    .required('O valor é obrigatorio')
});

export function Register() {
  const [transactionType, settransactionType] = useState("");
  const [categoryModalOpen, setcategoryModalOpen] = useState(false);

  const [category, setcategory] = useState({
    key: "category",
    name: "categoria",
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema)
  });

  function handleTransactionsTypesSelect(type: "up" | "down") {
    settransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setcategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setcategoryModalOpen(false);
  }

  function handleRegister(form: FormData) {
    if(!transactionType)
        return Alert.alert('selecione o tipo da transacao');

    if(category.key === 'category')
        return Alert.alert('selecione a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.warn(data);
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionsTypesSelect("up")}
                isActive={transactionType === "up"}
              />

              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionsTypesSelect("down")}
                isActive={transactionType === "down"}
              />
            </TransactionsTypes>
            <CategoryelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setcategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
