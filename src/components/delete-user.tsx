import type { FormErrorType } from "@/domains/types/form-error";
import type { SerializedResult } from "@/domains/types/serialized-result";
import type { DeleteUserType } from "@/domains/types/user";
import { Alert, Button } from "@heroui/react";
import React from "react";

interface DeleteProps {
  user: DeleteUserType;
  onDeleted: (deleted: number) => void;
}

export default function DeleteUser({ user, onDeleted }: DeleteProps) {
  const [formErrors, setFormErrors] = React.useState<FormErrorType>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    setFormErrors({});

    const body: DeleteUserType = {
      id: user.id,
    };

    try {
      const response = await fetch("/apis/delete-user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result: SerializedResult<number> = await response.json();

      if (!result.success) {
        const err = result.error;

        setFormErrors({
          form: err.message || "Erro inesperado. Tente novamente.",
        });

        return;
      }

      onDeleted(result.data);
    } catch (err) {
      setFormErrors({ form: "Erro ao apagar usuário." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        color="danger"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        onPress={onSubmit}
      >
        Apagar
      </Button>

      {formErrors.form && (
        <Alert
          color="danger"
          title="Ops! Aconteceu um erro."
          description={formErrors.form}
          variant="faded"
        />
      )}
    </div>
  );
}
