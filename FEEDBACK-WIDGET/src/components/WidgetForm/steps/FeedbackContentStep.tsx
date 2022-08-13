import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { ClsButton } from "../../ClsButton";
import { Loading } from "../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSend: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackSend,
  onFeedbackRestartRequested,
}: FeedbackContentStepProps) {
  const feedbackTypeinfo = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSendingFeedback(true);

    await api.post("/feedback", {
      type: feedbackType,
      comment,
      screenshot,
    });

    onFeedbackSend();
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeinfo.source}
            alt={feedbackTypeinfo.alt}
            className=" w-6 h-6"
          />
          {feedbackTypeinfo.title}
        </span>

        <ClsButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="ny=4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus-outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo?"
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2 w-full">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-700 rounded-[4px] border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-500 focus-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-700 transition-colors disabled:opacity-50 disabled:hover:bg-brand-700"
          >
            {isSendingFeedback ? <Loading /> : "enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
