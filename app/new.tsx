"use client";

import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { dummyRecommendations } from "../data/stockData-new";
import { NewCard } from "../components/newCard";
import { ExecuteButton } from "../components/ExecuteButton";
import { CreditCard } from "@/components/CreditCard";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

export default function NewScreen() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showStreakModal, setShowStreakModal] = useState(true);
  const streakDays = 3; // Static streak count
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Auto-hide the streak modal after 5 seconds
    if (showStreakModal) {
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setShowStreakModal(false);
        });
      }, 5000);

      // Show the modal with animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      return () => clearTimeout(timer);
    }
  }, [showStreakModal, fadeAnim, scaleAnim]);

  const handleSwipeLeft = () => {
    if (currentCardIndex < dummyRecommendations.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://res.cloudinary.com/dwbdtvo3s/image/upload/v1745057357/xwori62wi2y0lfcyanop.jpg",
      }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* App Header */}
        <BlurView intensity={20} tint="dark" style={styles.headerBlur}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { fontFamily: "Title-light" }]}>
                XILLION
              </Text>
              {/* <Text
                style={{
                  fontFamily: "Title-light",
                  fontSize: 20,
                  color: "white",
                }}
              >
                2400
              </Text> */}
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.streakContainer}>
                <LinearGradient
                  colors={["#e07aff", "#9D4EDD"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.streakBadge}
                >
                  <Text style={styles.streakEmoji}>🔥</Text>
                  <Text style={styles.streakCount}>{streakDays}</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>3</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.creditCardContainer}>
            <CreditCard />
          </View>

          <View style={styles.recommendationsSection}>
            <Text style={styles.sectionTitle}>Today's Recommendations</Text>
            <Text style={styles.sectionSubtitle}>
              Swipe to browse through our top picks
            </Text>

            <View style={styles.cardsContainer}>
              {dummyRecommendations?.map((stock, index) => {
                if (!stock || typeof stock !== "object") return null;
                // Only render cards that are the current one or the next few
                if (index < currentCardIndex || index > currentCardIndex + 2)
                  return null;

                // Calculate different shades for each card
                const gradientColors = [
                  index === 0
                    ? ["#9D4EDD", "#7B2CBF", "#5A189A"]
                    : index === 1
                    ? ["#7B2CBF", "#5A189A", "#3C096C"]
                    : ["#5A189A", "#3C096C", "#240046"],
                ];

                return (
                  <NewCard
                    key={stock.id}
                    stock={stock}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    index={index - currentCardIndex}
                    totalCards={Math.min(
                      3,
                      dummyRecommendations.length - currentCardIndex
                    )}
                    gradientColors={gradientColors[0]}
                  />
                );
              })}
            </View>

            <View style={styles.cardIndicators}>
              {dummyRecommendations.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor:
                        index === currentCardIndex
                          ? "#9D4EDD"
                          : "rgba(255, 255, 255, 0.2)",
                      width: index === currentCardIndex ? 20 : 8,
                    },
                  ]}
                />
              ))}
            </View>

            <BlurView intensity={20} tint="dark" style={styles.infoCard}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="rgba(255, 255, 255, 0.8)"
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                On executing this basket, buy orders along with stop loss and
                targets will be placed.
              </Text>
            </BlurView>
          </View>
        </ScrollView>

        <ExecuteButton />

        {/* Streak Celebration Modal */}
        <Modal visible={showStreakModal} transparent animationType="none">
          <View style={styles.modalContainer}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={["#e07aff", "#9D4EDD", "#7B2CBF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.modalGradient}
              >
                <View style={styles.fireContainer}>
                  <Text style={styles.fireEmoji}>🔥</Text>
                  <Text style={styles.streakNumber}>{streakDays}</Text>
                </View>
                <Text style={styles.modalTitle}>Amazing Streak!</Text>
                <Text style={styles.modalText}>
                  You've logged in for {streakDays} days in a row! Keep it up to
                  unlock special rewards.
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    Animated.parallel([
                      Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                      }),
                      Animated.timing(scaleAnim, {
                        toValue: 0.9,
                        duration: 300,
                        useNativeDriver: true,
                      }),
                    ]).start(() => {
                      setShowStreakModal(false);
                    });
                  }}
                >
                  <Text style={styles.modalButtonText}>Continue</Text>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(18, 18, 24, 0.85)",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerBlur: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(152, 128, 171, 0.3)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    // backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "#fff",
    // letterSpacing: 1,
    fontFamily: "Title-light",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakContainer: {
    marginRight: 16,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  streakEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  streakCount: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#e07aff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(18, 18, 24, 0.85)",
  },
  notificationCount: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  creditCardContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  recommendationsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    // fontWeight: "bold",
    marginBottom: 6,
    color: "#fff",
    fontFamily: "SUB",
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "SUB",
  },
  cardsContainer: {
    height: 220,
    position: "relative",
    marginBottom: 60,
  },
  cardIndicators: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(157, 78, 221, 0.3)",
    overflow: "hidden",
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
    color: "rgba(255, 255, 255, 0.8)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: width * 0.85,
    borderRadius: 24,
    overflow: "hidden",
  },
  modalGradient: {
    padding: 24,
    alignItems: "center",
  },
  fireContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  fireEmoji: {
    fontSize: 36,
  },
  streakNumber: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#e07aff",
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: "center",
    lineHeight: 30,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
    textAlign: "center",
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
