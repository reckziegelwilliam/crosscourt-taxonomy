'use client';

import Link from 'next/link';
import * as React from "react";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { CustomSelectForm } from "@/components/custom-select-form";
import { tournamentCreateSchema, TournamentEditorData } from "@/lib/validations/tournament";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import "@/styles/editor.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button"
import { useTournamentContext } from "@/context/tournament-form-context";

interface TournamentEditorProps {
  tournamentId: string;
}

export function TournamentEditor({ tournamentId }: TournamentEditorProps) {
  const methods = useForm<TournamentEditorData>({
    resolver: zodResolver(tournamentCreateSchema),
    defaultValues: {
      title: "",
      type: "SINGLE_ELIMINATION",
      competitorType: "TEAM",
      divisions: [],
    },
  });

  const { setEventId, title, setTitle, type, setType, competitorType, setCompetitorType } = useTournamentContext();
  const { register, handleSubmit, formState: { errors }, setValue } = methods;
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write about your tournament...",
        inlineToolbar: true,
        data: { blocks: [] }, // Initialize empty or with saved content
        tools: {
          header: Header,
        },
      });
    }
  }, []);

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

  React.useEffect(() => {
    // Fetch the tournament data when component mounts
    const fetchTournament = async () => {
      const response = await fetch(`/api/tournaments/${tournamentId}`);
      const data = await response.json();
      setEventId(data.eventId); // Assuming tournament has eventId
      setTitle(data.title);
      setType(data.type);
      setCompetitorType(data.competitorType);
      setValue("title", data.title);
      setValue("type", data.type);
      setValue("competitorType", data.competitorType);
      setValue("divisions", data.divisions);
      // Initialize the editor with saved content if exists
      ref.current?.render(data.content || { blocks: [] });
    };

    fetchTournament();
  }, [tournamentId, setEventId, setTitle, setType, setCompetitorType, setValue]);

  async function onSubmit(data: TournamentEditorData) {
    setIsSaving(true);

    const blocks = await ref.current?.save();

    const response = await fetch(`/api/tournaments/${tournamentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        content: blocks,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your tournament was not saved. Please try again.",
        variant: "destructive",
      });
    }

    router.refresh();

    return toast({
      description: "Your tournament has been saved.",
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
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 size-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">
              {tournamentId ? "Published" : "Draft"}
            </p>
            <button type="submit" className={cn(buttonVariants())}>
              {isSaving && <Icons.spinner className="mr-2 size-4 animate-spin" />}
              <span>Save</span>
            </button>
          </div>
          <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
            <TextareaAutosize
              autoFocus
              id="title"
              placeholder="Tournament title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              {...register("title")}
            />
            <div className="mt-4 grid grid-cols-2 gap-4"> {/* Reordered classes */}
              <CustomSelectForm
                label="Tournament Type"
                id="type"
                register={register("type")}
                error={errors.type?.message as string}
                type="select"
                options={[
                  { value: "SINGLE_ELIMINATION", label: "Single Elimination" },
                  { value: "DOUBLE_ELIMINATION", label: "Double Elimination" },
                  { value: "ROUND_ROBIN", label: "Round Robin" },
                  { value: "HYBRID", label: "Hybrid" },
                ]}
              />
              <CustomSelectForm
                label="Competitor Type"
                id="competitorType"
                register={register("competitorType")}
                error={errors.competitorType?.message as string}
                type="select"
                options={[
                  { value: "TEAM", label: "Team" },
                  { value: "PLAYER", label: "Player" },
                  { value: "BOTH", label: "Both" },
                ]}
              />
            </div>
            <div className="mt-6">
              <div id="editor" className="min-h-[500px] rounded-lg outline outline-zinc-300" /> {/* Reordered classes */}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
