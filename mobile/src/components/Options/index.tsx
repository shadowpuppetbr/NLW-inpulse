import React from "react";
import { Text, View } from "react-native";
import { Copyrights } from "../Copyrights";

import { styles } from "./styles";
import { Option } from "../Option";
import { feedbackTypes } from "../../utils/feedbackTypes";

export function Options() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option key={key} title={value.title} image={value.image} />
        ))}
      </View>
      <Copyrights />
    </View>
  );
}
