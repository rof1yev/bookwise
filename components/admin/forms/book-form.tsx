"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import ColorPicker from "../color-picker";

interface Props extends Partial<Book> {
  type?: "create" | "update";
}

const BookForm = ({ type, ...book }: Props) => {
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FieldGroup>
        <Controller
          name={"title"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel
                className="text-base font-normal text-dark-500"
                htmlFor="form-rhf-demo-title"
              >
                Title
              </FieldLabel>

              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Book title"
                required
                className="book-form_input"
              />
            </Field>
          )}
        />
        <Controller
          name={"author"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel
                className="text-base font-normal text-dark-500"
                htmlFor="form-rhf-demo-author"
              >
                Author
              </FieldLabel>

              <Input
                {...field}
                id="form-rhf-demo-author"
                aria-invalid={fieldState.invalid}
                placeholder="Book author"
                required
                className="book-form_input"
              />
            </Field>
          )}
        />
        <Controller
          name={"genre"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel
                className="text-base font-normal text-dark-500"
                htmlFor="form-rhf-demo-genre"
              >
                Genre
              </FieldLabel>

              <Input
                {...field}
                id="form-rhf-demo-genre"
                aria-invalid={fieldState.invalid}
                required
                className="book-form_input"
                placeholder="Book genre"
              />
            </Field>
          )}
        />
        <Controller
          name={"rating"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel className="text-base font-normal text-dark-500">
                Rating
              </FieldLabel>

              <Input
                type="number"
                min={1}
                max={5}
                placeholder="Book rating"
                {...field}
                className="book-form_input"
              />
            </Field>
          )}
        />
        <Controller
          name={"totalCopies"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel className="text-base font-normal text-dark-500">
                Total Copies
              </FieldLabel>

              <Input
                type="number"
                min={1}
                max={10000}
                placeholder="Total copies"
                {...field}
                className="book-form_input"
              />
            </Field>
          )}
        />

        <Controller
          name={"coverUrl"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel className="text-base font-normal text-dark-500">
                Book Image
              </FieldLabel>

              <FileUpload
                type="image"
                accept="image/*"
                folder="books/covers"
                value={field.value}
              />
            </Field>
          )}
        />

        <Controller
          name={"coverColor"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel className="text-base font-normal text-dark-500">
                Primary Color
              </FieldLabel>

              <ColorPicker
                onPickerChange={field.onChange}
                value={field.value}
              />
            </Field>
          )}
        />

        <Controller
          name={"description"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel
                className="text-base font-normal text-dark-500"
                htmlFor="form-rhf-demo-description"
              >
                Book Description
              </FieldLabel>

              <Textarea
                {...field}
                id="form-rhf-demo-description"
                aria-invalid={fieldState.invalid}
                required
                className="book-form_input"
                placeholder="Book description"
              />
            </Field>
          )}
        />

        <Controller
          name={"videoUrl"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel className="text-base font-normal text-dark-500">
                Book Image
              </FieldLabel>

              <FileUpload
                type="video"
                accept="video/*"
                folder="books/videos"
                value={field.value}
              />
            </Field>
          )}
        />

        <Controller
          name={"summary"}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="flex flex-col gap-1"
            >
              <FieldLabel
                className="text-base font-normal text-dark-500"
                htmlFor="form-rhf-demo-summary"
              >
                Book Summary
              </FieldLabel>

              <Textarea
                {...field}
                id="form-rhf-demo-summary"
                aria-invalid={fieldState.invalid}
                required
                className="book-form_input"
                placeholder="Book summary"
                rows={5}
              />
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        className="book-form_btn text-white bg-primary-admin hover:bg-primary-admin/80 transition-colors"
      >
        Add Book to Library
      </Button>
    </form>
  );
};
export default BookForm;
