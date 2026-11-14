import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import philosophersData from '../../data/philosophersData.json';
import { PhilosophyEntry } from '../../types';

export default function PhilosopherListScreen() {
  const { topic, title } = useLocalSearchParams<{ topic: string; title: string }>();
  const router = useRouter();

  // সিলেক্ট করা টপিক অনুযায়ী ডেটা ফিল্টার করা
  const filteredData = (philosophersData as PhilosophyEntry[]).filter(
    (item) => item.topicSlug === topic
  );

  const renderItem = ({ item }: { item: PhilosophyEntry }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: '/detail/[id]',
          params: { id: item.id },
        })
      }
    >
      <View style={styles.cardHeader}>
        {/* দার্শনিকের গোল ছবি */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.philosopherImage} />
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.philosopherName}>{item.philosopher}</Text>
          <Text style={styles.philosopherEra}>{item.era}</Text>
        </View>
      </View>

      <Text style={styles.quoteTitle} numberOfLines={2}>
        "{item.title}"
      </Text>

      <View style={styles.cardFooter}>
        <Text style={styles.readMoreText}>বিস্তারিত পড়ুন</Text>
        <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.bannerCategory}>টপিক</Text>
        <Text style={styles.bannerTitle}>{title}</Text>
        <Text style={styles.bannerSubtitle}>
          এই বিষয়ে প্রখ্যাত চিন্তাবিদদের দৃষ্টিভঙ্গি ও গভীর বিশ্লেষণ।
        </Text>
      </View>

      {filteredData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={48} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>এই টপিকে এখনো কোনো ডেটা যুক্ত করা হয়নি।</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F11',
    paddingHorizontal: SPACING.md,
  },
  headerBanner: {
    paddingVertical: SPACING.md,
    marginBottom: SPACING.sm,
  },
  bannerCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: '#16161A',
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#26262E',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    overflow: 'hidden',
    marginRight: SPACING.md,
  },
  philosopherImage: {
    width: '100%',
    height: '100%',
  },
  headerTextContainer: {
    flex: 1,
  },
  philosopherName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  philosopherEra: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  quoteTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#D1D1D6',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#26262E',
    paddingTop: SPACING.sm,
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    marginRight: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
});