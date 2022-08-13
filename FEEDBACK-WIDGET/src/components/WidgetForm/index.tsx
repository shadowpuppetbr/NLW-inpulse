import { useState } from "react";
import { ClsButton } from "../ClsButton";
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";

import bugImageURL from "../../assets/Emoji-Bug.svg";
import cloudImageURL from "../../assets/Emoji-Cloud.svg";
import lampImageURL from "../../assets/Emoji-Lamp.svg";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./steps/FeedbackSucessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    source: bugImageURL,
    alt: "Imagem de um inseto",
  },
  IDEIA: {
    title: "Ideia",
    source: lampImageURL,
    alt: "Imagem de uma lampada",
  },
  OTHER: {
    title: "Outro",
    source: cloudImageURL,
    alt: "Imagem de uma nuvem",
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSend, setFeedbackSend] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSend(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto text-white">
      {feedbackSend ? (
        <FeedbackSucessStep 
          onHandleRestartFeedback={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSend={() => setFeedbackSend(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        <p>
          Feito com ❤️ por{" "}
          <a
            className="underline underline-offset-2"
            href="https://www.linkedin.com/in/gustavo--leon/"
          >
            Gustavo
          </a>
        </p>
      </footer>
    </div>
  );
}
