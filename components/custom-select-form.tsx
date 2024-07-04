"use client";

import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CustomSelectFormProps {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
  options?: { value: string; label: string }[];
}

const CustomSelectForm: React.FC<CustomSelectFormProps> = ({
  label,
  id,
  register,
  error,
  type = "text",
  options,
}) => {
  return (
    <FormItem>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl>
        {type === "select" && options ? (
          <Select {...register}>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <Input
            id={id}
            type={type}
            className={cn("block w-full px-3 py-2 border rounded-md", error && "border-destructive")}
            aria-describedby={`${id}-message`}
            aria-invalid={!!error}
            {...register}
          />
        )}
      </FormControl>
      {error && (
        <FormMessage id={`${id}-message`} role="alert">
          {error}
        </FormMessage>
      )}
    </FormItem>
  );
};

export { CustomSelectForm };
