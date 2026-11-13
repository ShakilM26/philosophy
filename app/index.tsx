import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';
import { TopicCategory } from '../types';

const TOPICS: TopicCategory[] = [
  {
    id: '1',
    name: 'জীবন ও প্রজ্ঞা',
    slug: 'life',
    description: 'অস্তিত্বের অর্থ, আত্ম-জিজ্ঞাসা এবং জীবনবোধের গভীর দর্শন।',
    icon: 'compass-outline',
  },
  {
    id: '2',
    name: 'যন্ত্রণা ও সহনশীলতা',
    slug: 'suffering',
    description: 'কষ্ট, প্রতিকূলতা এবং মানসিক দৃঢ়তা অর্জনের স্টোয়িক ও অস্তিত্ববাদী পথ।',
    icon: 'flame-outline',
  },
  {
    id: '3',
    name: 'সিদ্ধান্ত ও নিয়ন্ত্রণ',
    slug: 'decision',
    description: 'কোন বিষয়গুলো আমাদের নিয়ন্ত্রণে এবং কীভাবে সঠিক সিদ্ধান্ত নিতে হয়।',
    icon: 'git-branch-outline',
  },
  {
    id: '4',
    name: 'সফলতা ও ব্যর্থতা',
    slug: 'success',
    description: 'অহংকার জয় করা এবং ব্যর্থতা থেকে ঘুরে দাঁড়ানোর চিরন্তন সূত্র।',
    icon: 'trophy-outline',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const renderTopicCard = ({ item }: { item: TopicCategory }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={() =>
        router.push({
          pathname: '/philosophers/[topic]',
          params: { topic: item.slug, title: item.name },
        })
      }
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon as any} size={26} color={COLORS.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.topicTitle}>{item.name}</Text>
        <Text style={styles.topicDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>দর্শন ও প্রজ্ঞা</Text>
        <Text style={styles.title}>আজ কোন বিষয়ে গভীরভাবে ভাবতে চান?</Text>
      </View>

      <FlatList
        data={TOPICS}
        keyExtractor={(item) => item.id}
        renderItem={renderTopicCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
  },
  header: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 34,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  cardContent: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
});