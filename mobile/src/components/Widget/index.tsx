import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Keyboard } from 'react-native';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSend] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSend(false);
  }

  function handleFeedbackSent() {
    setFeedbackSend(true);
    Keyboard.dismiss();
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'height' : undefined}>
    <TouchableOpacity
      style={styles.button}
      onPress={handleOpen}
    >
      <ChatTeardropDots
        size={24}
        weight="bold"
        color={theme.colors.text_on_brand_color}
       />

    </TouchableOpacity>

    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[1, 280]}
      backgroundStyle={styles.modal}
      handleIndicatorStyle={styles.indicator}
    >
      {
        feedbackSent ? 
        <Success
          onSendAnotherFeedback={handleRestartFeedback}
        />
        :
        <>
          {
            feedbackType ?
              <Form 
                feedbackType={feedbackType}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
              : 
              <Options 
                onFeedbackTypeChanged={setFeedbackType}
              />
          }
        </>
      }

    </BottomSheet>
    </KeyboardAvoidingView>
  );
}

export default gestureHandlerRootHOC(Widget)