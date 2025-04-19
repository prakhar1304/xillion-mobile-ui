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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");
const BUTTON_WIDTH = width - 40;
const SWIPE_THRESHOLD = BUTTON_WIDTH * 0.7;

export const ExecuteButton = () => {
  const videoRef = useRef(null);
  const { theme } = useTheme();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [exchangeDetails, setExchangeDetails] = useState({
    amount: 0.6948,
    currency: "ETH",
    value: 1797.45,
  });
  const pan = useRef(new Animated.ValueXY()).current;
  const [sliderPosition, setSliderPosition] = useState(0);

  // Animation values for the cat
  const catY = useRef(new Animated.Value(-100)).current;
  const catOpacity = useRef(new Animated.Value(0)).current;

  // Create an animated value for the gradient width
  const gradientWidth = useRef(new Animated.Value(0)).current;

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
    setSliderPosition(0);
  };

  // Update the gradient width when slider position changes
  useEffect(() => {
    const width = sliderPosition + 60;
    Animated.timing(gradientWidth, {
      toValue: width,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [sliderPosition]);

  // Reset video state when success modal is closed
  useEffect(() => {
    if (!showSuccessModal) {
      setVideoFinished(false);
    }
  }, [showSuccessModal]);

  // Play video when the success modal appears
  useEffect(() => {
    if (showSuccessModal && videoRef.current) {
      // Reset position for animation
      catY.setValue(-100);
      catOpacity.setValue(0);

      // Animate the cat coming down
      Animated.sequence([
        Animated.delay(300),
        Animated.parallel([
          Animated.timing(catY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(catOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      // Play the video when success modal appears
      videoRef.current.playAsync();
    }
  }, [showSuccessModal]);

  // Handle video playback status updates
  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setVideoFinished(true);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx <= BUTTON_WIDTH - 70) {
          pan.x.setValue(gestureState.dx);
          setSliderPosition(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.timing(pan, {
            toValue: { x: BUTTON_WIDTH - 70, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setShowConfirmModal(true);
            resetPosition();
          });
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const animatedGradientStyle = {
    width: gradientWidth,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderRadius: 20,
    zIndex: 1,
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={[styles.buttonContainer, { backgroundColor: theme.execute }]}
        >
          <Animated.View style={animatedGradientStyle}>
            <LinearGradient
              colors={theme.lighterPrimaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: BUTTON_WIDTH, height: "100%" }}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.slider,
              { backgroundColor: theme.primary },
              { transform: [{ translateX: pan.x }] },
            ]}
            {...panResponder.panHandlers}
          >
            <Ionicons name="flash" size={28} color="white" />
          </Animated.View>

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

      {/* Success Modal with Cat Animation or Tick Icon */}
      <Modal
        transparent={true}
        visible={showSuccessModal}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View
          style={[
            styles.successModalOverlay,
            { backgroundColor: theme.background },
          ]}
        >
          <View style={styles.successModalContent}>
            <View style={styles.catContainer}>
              {videoFinished ? (
                <View style={styles.successIconContainer}>
                  <MaterialIcons
                    name="check-circle"
                    size={120}
                    color={theme.primary}
                  />
                </View>
              ) : (
                <Video
                  ref={videoRef}
                  source={require("../assets/v/cat.mp4")}
                  style={styles.video}
                  resizeMode="cover"
                  shouldPlay={false}
                  isLooping={false}
                  useNativeControls={false}
                  onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />
              )}
            </View>

            {/* Success Text */}
            <Text style={[styles.successTitle, { color: theme.text }]}>
              Successfully Executed!
            </Text>
            <Text
              style={[
                styles.successDescription,
                { color: theme.textSecondary },
              ]}
            >
              You have successfully Executed
            </Text>

            {/* Done Button */}
            <TouchableOpacity
              style={[styles.doneButton, { backgroundColor: theme.primary }]}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
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
    paddingBottom: 20,
  },
  buttonContainer: {
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    elevation: 1,
  },
  slider: {
    position: "absolute",
    left: 0,
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 3,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    zIndex: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.57)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(86, 6, 120, 0.81)",
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
  successModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successModalContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  catContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    height: 350,
  },
  successIconContainer: {
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  successDescription: {
    fontSize: 16,
    textAlign: "center",
  },
  exchangeDetails: {
    flexDirection: "row",
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  exchangeAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  exchangeFor: {
    fontSize: 18,
  },
  exchangeValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  doneButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 40,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
