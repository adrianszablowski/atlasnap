import { AddTimelineItemModal } from '@/components/screens/trips/add-timeline-item-modal';
import { PlanItemRow } from '@/components/screens/trips/plan-item-row';
import { TripFriendsSelector } from '@/components/screens/trips/trip-friends-selector';
import type { PlanTripFormValues, TimelineItemFormValues } from '@/schemas';
import { useTheme } from '@/theme/use-theme';
import { DatePicker, Host, TextField } from '@expo/ui/swift-ui';
import { datePickerStyle, font, frame } from '@expo/ui/swift-ui/modifiers';
import map from 'lodash/map';
import { useState } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import {
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from 'react-native';

interface PlanTripFormProps {
	control: Control<PlanTripFormValues>;
	errors: FieldErrors<PlanTripFormValues>;
	formKey?: string | number;
}

export function PlanTripForm({ control, errors, formKey }: Readonly<PlanTripFormProps>) {
	const theme = useTheme();
	const [addItemKey, setAddItemKey] = useState(0);
	const [isAddingItem, setIsAddingItem] = useState(false);
	const { width: screenWidth } = useWindowDimensions();

	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const { fields, append, remove } = useFieldArray({ control, name: 'timelineItems' });

	const cityFieldWidth = screenWidth - 106;

	const handleOpenAddItem = () => {
		setAddItemKey((k) => k + 1);
		setIsAddingItem(true);
	};

	const handleItemAdded = (item: TimelineItemFormValues) => {
		append(item);
		setIsAddingItem(false);
	};

	return (
		<KeyboardAvoidingView style={styles.flex} behavior={process.env.EXPO_OS === 'ios' ? 'padding' : 'height'}>
			<ScrollView
				style={styles.flex}
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps='handled'
			>
				<View style={styles.section}>
					<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>TRIP NAME</Text>
					<Controller
						control={control}
						name='title'
						render={({ field: { value, onChange, onBlur } }) => (
							<TextInput
								style={[styles.titleInput, { color: theme.typography900 }]}
								placeholder='Summer in Santorini…'
								placeholderTextColor={theme.outline200}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								returnKeyType='next'
								autoCapitalize='words'
							/>
						)}
					/>
					{errors.title && (
						<Text style={[styles.errorText, { color: theme.secondary500 }]}>{errors.title.message}</Text>
					)}
				</View>
				<View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
					<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>DESTINATION</Text>
					<View style={[styles.fieldRow, styles.fieldRowBorder, { borderBottomColor: theme.outline100 }]}>
						<Text style={styles.fieldIcon}>🔍</Text>
						<View style={styles.flex}>
							<Controller
								control={control}
								name='city'
								render={({ field: { value, onChange } }) => (
									<Host matchContents>
										<TextField
											key={formKey}
											defaultValue={value}
											placeholder='Search for a city…'
											onValueChange={onChange}
											axis='horizontal'
											modifiers={[frame({ width: cityFieldWidth }), font({ size: 16 })]}
										/>
									</Host>
								)}
							/>
						</View>
					</View>
					{errors.city && <Text style={[styles.errorText, { color: theme.secondary500 }]}>{errors.city.message}</Text>}
					<View style={[styles.fieldRow, styles.fieldRowBorder, { borderBottomColor: theme.outline100 }]}>
						<Text style={styles.fieldIcon}>🌍</Text>
						<Controller
							control={control}
							name='country'
							render={({ field: { value, onChange, onBlur } }) => (
								<TextInput
									style={[styles.fieldInput, { color: theme.typography900 }]}
									placeholder='Country'
									placeholderTextColor={theme.outline300}
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									autoCapitalize='words'
									returnKeyType='next'
								/>
							)}
						/>
					</View>
					{errors.country && (
						<Text style={[styles.errorText, { color: theme.secondary500 }]}>{errors.country.message}</Text>
					)}
					<View style={styles.fieldRow}>
						<Text style={styles.fieldIcon}>🚩</Text>
						<Controller
							control={control}
							name='flag'
							render={({ field: { value, onChange, onBlur } }) => (
								<TextInput
									style={[styles.fieldInput, { color: theme.typography900 }]}
									placeholder='Flag emoji  e.g. 🇮🇹'
									placeholderTextColor={theme.outline300}
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									returnKeyType='done'
								/>
							)}
						/>
					</View>
				</View>
				<View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
					<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>DATES</Text>
					<View style={styles.datesRow}>
						<View style={styles.dateCol}>
							<Text style={[styles.dateLabel, { color: theme.typography500 }]}>Departure</Text>
							<Controller
								control={control}
								name='startDate'
								render={({ field: { value, onChange } }) => (
									<Host matchContents>
										<DatePicker
											selection={value}
											onDateChange={onChange}
											displayedComponents={['date']}
											modifiers={[datePickerStyle('compact')]}
										/>
									</Host>
								)}
							/>
						</View>
						<View style={[styles.dateDivider, { backgroundColor: theme.outline100 }]} />
						<View style={styles.dateCol}>
							<Text style={[styles.dateLabel, { color: theme.typography500 }]}>Return</Text>
							<Controller
								control={control}
								name='endDate'
								render={({ field: { value, onChange } }) => (
									<Host matchContents>
										<DatePicker
											selection={value ?? new Date()}
											onDateChange={onChange}
											displayedComponents={['date']}
											modifiers={[datePickerStyle('compact')]}
										/>
									</Host>
								)}
							/>
						</View>
					</View>
				</View>
				<View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
					<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>TRAVELERS</Text>
					<Controller
						control={control}
						name='participantIds'
						render={({ field: { value, onChange } }) => (
							<TripFriendsSelector selectedIds={value ?? []} onChange={onChange} />
						)}
					/>
				</View>
				<View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
					<View style={styles.planHeader}>
						<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>TRIP PLAN</Text>
						{fields.length > 0 && (
							<Text style={[styles.planCount, { color: theme.typography400 }]}>
								{fields.length} {fields.length === 1 ? 'item' : 'items'}
							</Text>
						)}
					</View>
					{fields.length === 0 ? (
						<Pressable
							onPress={handleOpenAddItem}
							style={({ pressed }) => [styles.emptyPlan, { borderColor: theme.outline200, opacity: pressed ? 0.7 : 1 }]}
						>
							<Text style={styles.emptyPlanEmoji}>✈️</Text>
							<Text style={[styles.emptyPlanTitle, { color: theme.typography600 }]}>Add your first plan item</Text>
							<Text style={[styles.emptyPlanHint, { color: theme.typography400 }]}>
								Flight, hotel, activity, restaurant…
							</Text>
						</Pressable>
					) : (
						<>
							{map(fields, (field, index) => (
								<PlanItemRow key={field.id} item={field} onRemove={() => remove(index)} />
							))}
							<Pressable
								onPress={handleOpenAddItem}
								style={({ pressed }) => [styles.addItemBtn, { opacity: pressed ? 0.7 : 1 }]}
							>
								<Text style={[styles.addItemBtnText, { color: theme.primary500 }]}>+ Add Item</Text>
							</Pressable>
						</>
					)}
				</View>
				<View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
					<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>TRIP NOTES</Text>
					<Controller
						control={control}
						name='note'
						render={({ field: { value, onChange, onBlur } }) => (
							<TextInput
								style={[styles.noteInput, { color: theme.typography900 }]}
								placeholder='Ideas, things to pack, notes for the trip…'
								placeholderTextColor={theme.outline300}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								multiline
								textAlignVertical='top'
							/>
						)}
					/>
				</View>
				<View style={styles.bottomSpacer} />
			</ScrollView>
			<AddTimelineItemModal
				key={addItemKey}
				visible={isAddingItem}
				tripStartDate={startDate}
				tripEndDate={endDate}
				onAdd={handleItemAdded}
				onDismiss={() => setIsAddingItem(false)}
			/>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	flex: { flex: 1 },
	content: { paddingHorizontal: 20, paddingTop: 28, gap: 16 },
	section: { gap: 10 },
	sectionLabel: {
		fontSize: 12,
		fontWeight: '800',
		letterSpacing: 2,
		textTransform: 'uppercase',
	},
	titleInput: {
		fontSize: 38,
		fontWeight: '800',
		letterSpacing: -1,
		lineHeight: 46,
		minHeight: 56,
	},
	errorText: { fontSize: 12, fontWeight: '600' },
	card: {
		borderRadius: 20,
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
	},
	fieldRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingVertical: 12,
	},
	fieldRowBorder: { borderBottomWidth: StyleSheet.hairlineWidth },
	fieldIcon: { fontSize: 16, width: 24, textAlign: 'center' },
	fieldInput: { flex: 1, fontSize: 16, fontWeight: '500', height: 28 },
	datesRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
	dateCol: { flex: 1, gap: 8 },
	dateLabel: { fontSize: 13, fontWeight: '600' },
	dateDivider: { width: 1, height: 44, marginHorizontal: 16 },
	noteInput: {
		fontSize: 15,
		fontWeight: '400',
		lineHeight: 24,
		minHeight: 110,
		marginTop: 12,
	},
	planHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	planCount: { fontSize: 12, fontWeight: '600' },
	emptyPlan: {
		borderRadius: 14,
		borderWidth: 1.5,
		borderStyle: 'dashed',
		paddingVertical: 24,
		alignItems: 'center',
		gap: 4,
		marginBottom: 8,
	},
	emptyPlanEmoji: { fontSize: 24, marginBottom: 4 },
	emptyPlanTitle: { fontSize: 14, fontWeight: '700' },
	emptyPlanHint: { fontSize: 12, fontWeight: '500' },
	addItemBtn: {
		paddingVertical: 12,
		alignItems: 'center',
	},
	addItemBtnText: { fontSize: 14, fontWeight: '700' },
	bottomSpacer: { height: 48 },
});
