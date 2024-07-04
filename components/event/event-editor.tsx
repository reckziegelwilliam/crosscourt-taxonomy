"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event } from "@prisma/client";
import { useForm, FormProvider } from "react-hook-form";
import { CustomFormItem } from "@/components/form-item";
import { formatDate } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";
import * as z from "zod";

import "@/styles/editor.css";
import { cn } from "@/lib/utils";
import { eventPatchSchema } from "@/lib/validations/event";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";

interface EventEditorProps {
  event: Pick<Event, "id" | "title" | "content" | "startDate" | "endDate" | "published">;
}

type FormData = z.infer<typeof eventPatchSchema>;

export function EventEditor({ event }: EventEditorProps) {
  const methods = useForm<FormData>({
    resolver: zodResolver(eventPatchSchema),
  });
  const { register, handleSubmit, formState: { errors } } = methods;
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;

    const body = eventPatchSchema.parse(event);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write about your event...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [event]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const blocks = await ref.current?.save();

    const response = await fetch(`/api/events/${event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
        startDate: formatDate(data.startDate),
        endDate: formatDate(data.endDate),
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your event was not saved. Please try again.",
        variant: "destructive",
      });
    }

    router.refresh();

    return toast({
      description: "Your event has been saved.",
    });
  }

  if (!isMounted) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full gap-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <>
                  <Icons.chevronLeft className="mr-2 size-4" /> {/* Reordered classes */}
                  Back
                </>
              </Link>
              <p className="text-sm text-muted-foreground">
                {event.published ? "Published" : "Draft"}
              </p>
            </div>
            <button type="submit" className={cn(buttonVariants())}>
              {isSaving && <Icons.spinner className="mr-2 size-4 animate-spin" />} {/* Reordered classes */}
              <span>Save</span>
            </button>
          </div>
          <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
            <TextareaAutosize
              autoFocus
              id="title"
              defaultValue={event.title}
              placeholder="Event title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              {...register("title")}
            />
            <div className="mt-auto grid grid-cols-2 gap-4"> {/* Reordered classes */}
              <div className="grid grid-rows-6">
                <CustomFormItem
                  label="Start Date"
                  id="startDate"
                  register={register}
                  error={errors.startDate as any}
                  type="date"
                />
                <CustomFormItem
                  label="End Date"
                  id="endDate"
                  register={register}
                  error={errors.endDate as any}
                  type="date"
                />
              </div>
              <div id="editor" className="min-h-[500px] mx-auto pl-4 gap-2 rounded-lg outline outline-zinc-300" /> {/* Reordered classes */}
            </div>
            <p className="text-sm text-gray-500">
              Use{" "}
              <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                Tab
              </kbd>{" "}
              to open the command menu.
            </p>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
