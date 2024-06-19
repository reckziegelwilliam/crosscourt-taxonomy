// components/form-item.tsx
import * as React from "react";
import { UseFormRegister, FieldErrors, useFormContext } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Define the props for the CustomFormItem component
type CustomFormItemProps = {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  error?: FieldErrors;
  type?: React.HTMLInputTypeAttribute;
};

const CustomFormItem: React.FC<CustomFormItemProps> = ({
  label,
  id,
  register,
  error,
  type = "text",
}) => {
  const { formState: { errors } } = useFormContext() || { formState: { errors: {} } };

  // Extract error message if available
  const errorMessage = error ? (error.message as unknown as string) : null;

  return (
    <FormItem>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl>
        <Input
          id={id}
          type={type}
          className={cn("block w-full px-3 py-2 border rounded-md", error && "border-destructive")}
          aria-describedby={`${id}-message`}
          aria-invalid={!!error}
          {...register(id as any)}
        />
      </FormControl>
      {errorMessage && (
        <FormMessage id={`${id}-message`} role="alert">
          {errorMessage}
        </FormMessage>
      )}
    </FormItem>
  );
};

export { CustomFormItem };
