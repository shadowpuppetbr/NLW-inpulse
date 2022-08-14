import React, { useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { styles } from "./styles";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";

import { Options } from "../Options";
import { Form } from "../Form";
import { Success } from "../Success";

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [wasFeedbackSend, setWasFeedbackSend] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setWasFeedbackSend(false);
  }

  function handleFeedbackSend() {
    setWasFeedbackSend(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {wasFeedbackSend ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : feedbackType ? (
          <Form
            onFeedbackCanseled={handleRestartFeedback}
            onFeedbackSend={handleFeedbackSend}
            feedbackType={feedbackType}
          />
        ) : (
          <Options onFeedbackTypeChanged={setFeedbackType} />
        )}
      </BottomSheet>
    </>
  );
}
export default gestureHandlerRootHOC(Widget);
