"use client";

import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const BUTTON_WIDTH = width - 40;
const SWIPE_THRESHOLD = BUTTON_WIDTH * 0.7;

export const ExecuteButton = () => {
  const { theme } = useTheme();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const [sliderPosition, setSliderPosition] = useState(0);

  // Create an animated value for the gradient width
  // This will control how much of the gradient is visible as the slider moves
  const gradientWidth = useRef(new Animated.Value(0)).current;

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
    setSliderPosition(0);
  };

  // Update the gradient width when slider position changes
  // This effect synchronizes the gradient width with the slider position
  useEffect(() => {
    // We add the width of the slider button (60) to ensure the gradient extends fully to the right edge of the button
    // This creates the "painting" effect as the button moves
    const width = sliderPosition + 60;

    Animated.timing(gradientWidth, {
      toValue: width,
      duration: 0, // No delay for immediate response
      useNativeDriver: false,
    }).start();
  }, [sliderPosition]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx <= BUTTON_WIDTH - 70) {
          // Update the slider position and the visual position of the button
          pan.x.setValue(gestureState.dx);
          setSliderPosition(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          // If swiped past threshold, animate to the end and show confirmation
          Animated.timing(pan, {
            toValue: { x: BUTTON_WIDTH - 70, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setShowConfirmModal(true);
            resetPosition();
          });
        } else {
          // Otherwise reset back to the start
          resetPosition();
        }
      },
    })
  ).current;

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  // Create the animated gradient width style
  // This style controls the container of the gradient
  const animatedGradientStyle = {
    // Use the animated width value to dynamically adjust the width of the gradient container
    width: gradientWidth,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    // Important: removing any border radius from this container allows the gradient
    // to stay connected with the slider button without any gaps
    overflow: "hidden",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderRadius: 30,

    // Adding zIndex to ensure gradient stays below the text and slider
    zIndex: 1,
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={[styles.buttonContainer, { backgroundColor: theme.execute }]}
        >
          {/* 
            Animated gradient background: 
            - This view's width is controlled by the slider position
            - As the slider moves right, the gradient expands with it
            - The LinearGradient fills the entire available width
          */}
          <Animated.View style={animatedGradientStyle}>
            <LinearGradient
              colors={theme.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: BUTTON_WIDTH, height: "100%" }}
            />
          </Animated.View>

          {/* 
            Slider button:
            - This is the draggable button element
            - Its position is controlled by the pan.x animated value
            - zIndex: 3 ensures it stays on top of everything else
          */}
          <Animated.View
            style={[
              styles.slider,
              { backgroundColor: theme.executeIcon },
              { transform: [{ translateX: pan.x }] },
            ]}
            {...panResponder.panHandlers}
          >
            <Ionicons name="flash" size={28} color="white" />
          </Animated.View>

          {/* 
            Button text:
            - This text is centered in the button
            - zIndex: 2 ensures it stays above the gradient but below the slider
          */}
          <Text style={[styles.buttonText, { color: theme.text }]}>
            EXECUTE ALL
          </Text>
        </View>
      </View>

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={showConfirmModal}
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Confirm Execution
            </Text>
            <Text
              style={[styles.modalDescription, { color: theme.textSecondary }]}
            >
              Are you sure you want to execute all recommended trades? This will
              place buy orders with the specified stop loss and target prices.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.cancelButton,
                  { borderColor: theme.border },
                ]}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: theme.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirmButton,
                  { backgroundColor: theme.primary },
                ]}
                onPress={handleConfirm}
              >
                <Text style={[styles.modalButtonText, { color: "white" }]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        transparent={true}
        visible={showSuccessModal}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <View
              style={[styles.successIcon, { backgroundColor: theme.success }]}
            >
              <Ionicons name="checkmark" size={40} color="white" />
            </View>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Orders Executed Successfully!
            </Text>
            <Text
              style={[styles.modalDescription, { color: theme.textSecondary }]}
            >
              All recommended trades have been placed. You can track their
              status in your portfolio.
            </Text>
            <TouchableOpacity
              style={[styles.fullButton, { backgroundColor: theme.primary }]}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.fullButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  buttonContainer: {
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden", // Important to clip any overflow from the gradient and slider
  },

  slider: {
    position: "absolute",
    left: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 3, // Highest z-index to ensure it's on top
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    zIndex: 2, // Higher than gradient but lower than slider
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  cancelButton: {
    borderWidth: 1,
  },
  confirmButton: {
    borderWidth: 0,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  successIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  fullButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  fullButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
