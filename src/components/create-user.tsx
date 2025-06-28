import type { FormErrorType } from "@/domains/types/form-error";
import type { SerializedResult } from "@/domains/types/serialized-result";
import type { UserType } from "@/domains/types/user";
import {
  Alert,
  Button,
  Form,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import React from "react";

interface CreateProps {
  onCreated: (created: UserType) => void;
}

export default function CreateUser({ onCreated }: CreateProps) {
  const [formErrors, setFormErrors] = React.useState<FormErrorType>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isOpenOverlay, setOpenOverlay] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData as unknown as Iterable<[string, FormDataEntryValue]>,
    );

    console.log("Data: ", data);

    try {
      const response = await fetch("/apis/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: SerializedResult<UserType> = await response.json();
      console.log("Resultado: ", result);

      if (!result.success) {
        const err = result.error;

        if (err.name === "FieldError") {
          setFormErrors(
            err.fields ?? { form: "Erro desconhecido nos campos." },
          );
          return;
        }

        setFormErrors({
          form: err.message || "Erro inesperado. Tente novamente.",
        });

        return;
      }

      form.reset();
      onCreated(result.data);
      setOpenOverlay(false);
    } catch (err) {
      console.log(err);
      setFormErrors({ form: "Erro ao criar usuário." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popover
      isOpen={isOpenOverlay}
      onOpenChange={setOpenOverlay}
      placement="bottom"
    >
      <PopoverTrigger>
        <Button color="primary">Novo Usuário</Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          validationErrors={formErrors}
        >
          <Input
            isRequired
            name="name"
            label="Nome"
            labelPlacement="outside"
            placeholder="Digite o nome do usuário"
          />
          <Input
            isRequired
            name="description"
            label="Descrição"
            labelPlacement="outside"
            placeholder="Descrição do usuário"
          />
          <Input
            isRequired
            name="avatarLink"
            label="Avatar (URL)"
            labelPlacement="outside"
            placeholder="https://"
            type="url"
          />

          <Button
            type="submit"
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            color="primary"
            className="w-full"
          >
            Criar Usuário
          </Button>

          {formErrors.form && (
            <Alert
              color="danger"
              title="Ops! Aconteceu um erro."
              description={formErrors.form}
              variant="faded"
            />
          )}
        </Form>
      </PopoverContent>
    </Popover>
  );
}
