import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import philosophersData from '../../data/philosophersData.json';
import { PhilosophyEntry } from '../../types';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const entry = (philosophersData as PhilosophyEntry[]).find((item) => item.id === id);

  if (!entry) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>তথ্য খুঁজে পাওয়া যায়নি।</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* প্রিমিয়াম সেন্ট্রালাইজড কার্ড */}
      <View style={styles.premiumCard}>
        {/* গোল ছবি */}
        <View style={styles.imageBorderRing}>
          <Image source={{ uri: entry.image }} style={styles.philosopherImage} />
        </View>

        {/* সোর্স বুক */}
        <Text style={styles.sourceBook}>{entry.sourceBook}</Text>

        {/* ফিলোসফার নাম */}
        <Text style={styles.philosopherName}>{entry.philosopher}</Text>

        {/* টাইটেল / প্লেইন টেক্সট */}
        <Text style={styles.philosopherEraText}>{entry.era}</Text>

        {/* ডায়মন্ড ডিভাইডার */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.diamond}>◆</Text>
          <View style={styles.line} />
        </View>

        {/* উক্তি */}
        <Text style={styles.quoteText}>{entry.quote}</Text>

        {/* নিচের ডায়মন্ড ডিভাইডার */}
        <View style={styles.dividerContainerBottom}>
          <View style={styles.line} />
          <Text style={styles.diamond}>◆</Text>
          <View style={styles.line} />
        </View>
      </View>

      {/* সোশাল অ্যাকশন বার (Share, Like, Save) */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => setLiked(!liked)}>
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={22} 
            color={liked ? "#FF4B4B" : COLORS.textPrimary} 
          />
          <Text style={styles.actionCount}>81</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => setSaved(!saved)}>
          <Ionicons 
            name={saved ? "bookmark" : "bookmark-outline"} 
            size={22} 
            color={saved ? COLORS.primary : COLORS.textPrimary} 
          />
        </TouchableOpacity>
      </View>

      {/* ঐতিহাসিক প্রেক্ষাপট ও গভীর তাৎপর্য সেকশন */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="time-outline" size={18} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>ঐতিহাসিক ও মনস্তাত্ত্বিক প্রেক্ষাপট</Text>
        </View>
        <Text style={styles.sectionBody}>{entry.context}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb-outline" size={18} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>গভীর তাৎপর্য ও জীবনদর্শন</Text>
        </View>
        <Text style={styles.sectionBody}>{entry.significance}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F11',
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl * 2,
  },
  premiumCard: {
    backgroundColor: '#16161A',
    borderRadius: 24,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#26262E',
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  imageBorderRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    padding: 3,
  },
  philosopherImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  sourceBook: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  philosopherName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 1,
    marginBottom: 2,
    textAlign: 'center',
  },
  philosopherEraText: {
    fontSize: 12,
    color: COLORS.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    marginBottom: SPACING.md,
  },
  dividerContainerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    marginTop: SPACING.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#33333D',
  },
  diamond: {
    color: COLORS.primary,
    fontSize: 10,
    marginHorizontal: 8,
  },
  quoteText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#D1D1D6',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    gap: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C22',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2A2A33',
  },
  actionCount: {
    color: COLORS.textPrimary,
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '600',
  },
  sectionContainer: {
    backgroundColor: '#16161A',
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#26262E',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  sectionBody: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#0F0F11',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});