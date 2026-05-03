import {
	TIMELINE_ITEM_CURRENCIES,
	timelineItemModalFormSchema,
	timelineItemModalFormToItem,
	type TimelineItemFormValues,
	type TimelineItemModalFormValues,
} from '@/schemas';
import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import type { TimelineItemType } from '@/types/types';
import { getTimelineItemColor, getTimelineItemEmoji } from '@/utils/timeline';
import { DatePicker, Host } from '@expo/ui/swift-ui';
import { datePickerStyle } from '@expo/ui/swift-ui/modifiers';
import { zodResolver } from '@hookform/resolvers/zod';
import map from 'lodash/map';
import { Controller, useForm } from 'react-hook-form';
import {
	KeyboardAvoidingView,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	View,
} from 'react-native';

const ITEM_TYPES: { type: TimelineItemType; label: string }[] = [
	{ type: 'transport', label: 'Transport' },
	{ type: 'stay', label: 'Stay' },
	{ type: 'activity', label: 'Activity' },
	{ type: 'food', label: 'Food' },
	{ type: 'note', label: 'Note' },
	{ type: 'other', label: 'Other' },
];

interface AddTimelineItemModalProps {
	visible: boolean;
	tripStartDate?: Date;
	tripEndDate?: Date;
	onAdd: (item: TimelineItemFormValues) => void;
	onDismiss: () => void;
}

export function AddTimelineItemModal({
	visible,
	tripStartDate,
	onAdd,
	onDismiss,
}: Readonly<AddTimelineItemModalProps>) {
	const theme = useTheme();

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<TimelineItemModalFormValues>({
		resolver: zodResolver(timelineItemModalFormSchema),
		defaultValues: {
			type: 'transport',
			title: '',
			hasWhen: false,
			startsDate: tripStartDate ? new Date(tripStartDate) : new Date(),
			startsTime: new Date(new Date().setHours(9, 0, 0, 0)),
			locationLabel: '',
			description: '',
			hasCost: false,
			costAmountInput: '',
			costCurrency: 'PLN',
			splitType: 'split_equally',
		},
	});

	const hasWhen = watch('hasWhen');
	const hasCost = watch('hasCost');

	const onSubmit = handleSubmit((values) => {
		onAdd(timelineItemModalFormToItem(values));
	});

	return (
		<Modal visible={visible} animationType='slide' presentationStyle='pageSheet' onRequestClose={onDismiss}>
			<View style={[styles.root, { backgroundColor: theme.background50 }]}>
				<View style={[styles.header, { borderBottomColor: theme.outline100 }]}>
					<Pressable onPress={onDismiss} hitSlop={8} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
						<Text style={[styles.headerCancel, { color: theme.typography600 }]}>Cancel</Text>
					</Pressable>
					<Text style={[styles.headerTitle, { color: theme.typography900 }]}>Add Plan Item</Text>
					<Pressable onPress={onSubmit} hitSlop={8} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
						<Text style={[styles.headerSave, { color: theme.primary500 }]}>Add</Text>
					</Pressable>
				</View>
				<KeyboardAvoidingView style={styles.flex} behavior={process.env.EXPO_OS === 'ios' ? 'padding' : 'height'}>
					<ScrollView
						style={styles.flex}
						contentContainerStyle={styles.content}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps='handled'
					>
						<View style={styles.section}>
							<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>TYPE</Text>
							<Controller
								control={control}
								name='type'
								render={({ field: { value, onChange } }) => (
									<View style={styles.typeGrid}>
										{map(ITEM_TYPES, ({ type, label }) => {
											const emoji = getTimelineItemEmoji(type);
											const color = getTimelineItemColor(type, theme);
											const isSelected = value === type;

											return (
												<Pressable
													key={type}
													onPress={() => onChange(type)}
													style={({ pressed }) => [
														styles.typeChip,
														{
															backgroundColor: isSelected ? hexToRgba(color, 0.14) : theme.background100,
															borderColor: isSelected ? color : theme.outline200,
															opacity: pressed ? 0.75 : 1,
														},
													]}
												>
													<Text style={styles.typeChipEmoji}>{emoji}</Text>
													<Text
														style={[styles.typeChipLabel, { color: isSelected ? color : theme.typography600 }]}
														numberOfLines={1}
													>
														{label}
													</Text>
												</Pressable>
											);
										})}
									</View>
								)}
							/>
						</View>
						<View style={styles.section}>
							<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>TITLE</Text>
							<View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
								<Controller
									control={control}
									name='title'
									render={({ field: { value, onChange, onBlur } }) => (
										<TextInput
											style={[styles.titleInput, { color: theme.typography900 }]}
											placeholder='e.g. Flight to Rome, Cave Hotel, Sunset walk…'
											placeholderTextColor={theme.outline300}
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
											autoFocus
											returnKeyType='next'
											autoCapitalize='sentences'
										/>
									)}
								/>
							</View>
							{errors.title && (
								<Text style={[styles.errorText, { color: theme.secondary500 }]}>{errors.title.message}</Text>
							)}
						</View>
						<View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
							<View style={styles.toggleRow}>
								<View style={styles.toggleLabelGroup}>
									<Text style={[styles.toggleLabel, { color: theme.typography700 }]}>Date & Time</Text>
									<Text style={[styles.toggleHint, { color: theme.typography400 }]}>Optional</Text>
								</View>
								<Controller
									control={control}
									name='hasWhen'
									render={({ field: { value, onChange } }) => (
										<Switch value={value} onValueChange={onChange} trackColor={{ true: theme.primary500 }} />
									)}
								/>
							</View>
							{hasWhen && (
								<>
									<View style={[styles.dateRow, { borderTopColor: theme.outline100 }]}>
										<Text style={[styles.dateLabel, { color: theme.typography500 }]}>Date</Text>
										<Controller
											control={control}
											name='startsDate'
											render={({ field: { value, onChange } }) => (
												<Host matchContents>
													<DatePicker
														selection={value}
														onDateChange={(d) => {
															const result = new Date(d);
															result.setHours(value.getHours(), value.getMinutes(), 0, 0);
															onChange(result);
														}}
														displayedComponents={['date']}
														modifiers={[datePickerStyle('compact')]}
													/>
												</Host>
											)}
										/>
									</View>
									<View style={[styles.dateRow, { borderTopColor: theme.outline100 }]}>
										<Text style={[styles.dateLabel, { color: theme.typography500 }]}>Time</Text>
										<Controller
											control={control}
											name='startsTime'
											render={({ field: { value, onChange } }) => (
												<Host matchContents>
													<DatePicker
														selection={value}
														onDateChange={onChange}
														displayedComponents={['hourAndMinute']}
														modifiers={[datePickerStyle('compact')]}
													/>
												</Host>
											)}
										/>
									</View>
								</>
							)}
						</View>
						<View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
							<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>DETAILS</Text>
							<View style={[styles.fieldRow, { borderBottomColor: theme.outline100 }]}>
								<Text style={styles.fieldIcon}>📍</Text>
								<Controller
									control={control}
									name='locationLabel'
									render={({ field: { value, onChange, onBlur } }) => (
										<TextInput
											style={[styles.fieldInput, { color: theme.typography900 }]}
											placeholder='Location (optional)'
											placeholderTextColor={theme.outline300}
											value={value ?? ''}
											onChangeText={onChange}
											onBlur={onBlur}
											returnKeyType='next'
										/>
									)}
								/>
							</View>
							<View style={styles.fieldRow}>
								<Text style={styles.fieldIcon}>📝</Text>
								<Controller
									control={control}
									name='description'
									render={({ field: { value, onChange, onBlur } }) => (
										<TextInput
											style={[styles.fieldInput, styles.descriptionInput, { color: theme.typography900 }]}
											placeholder='Description or note (optional)'
											placeholderTextColor={theme.outline300}
											value={value ?? ''}
											onChangeText={onChange}
											onBlur={onBlur}
											multiline
											textAlignVertical='top'
										/>
									)}
								/>
							</View>
						</View>
						<View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}>
							<View style={styles.toggleRow}>
								<View style={styles.toggleLabelGroup}>
									<Text style={[styles.toggleLabel, { color: theme.typography700 }]}>Cost</Text>
									<Text style={[styles.toggleHint, { color: theme.typography400 }]}>Optional</Text>
								</View>
								<Controller
									control={control}
									name='hasCost'
									render={({ field: { value, onChange } }) => (
										<Switch value={value} onValueChange={onChange} trackColor={{ true: theme.primary500 }} />
									)}
								/>
							</View>
							{hasCost && (
								<>
									<View style={[styles.costAmountRow, { borderTopColor: theme.outline100 }]}>
										<Controller
											control={control}
											name='costAmountInput'
											render={({ field: { value, onChange, onBlur } }) => (
												<TextInput
													style={[styles.costInput, { color: theme.typography900 }]}
													placeholder='0'
													placeholderTextColor={theme.outline300}
													value={value}
													onChangeText={onChange}
													onBlur={onBlur}
													keyboardType='decimal-pad'
												/>
											)}
										/>
										<Controller
											control={control}
											name='costCurrency'
											render={({ field: { value, onChange } }) => (
												<View style={styles.currencyRow}>
													{map(TIMELINE_ITEM_CURRENCIES, (c) => (
														<Pressable
															key={c}
															onPress={() => onChange(c)}
															style={({ pressed }) => [
																styles.currencyChip,
																{
																	backgroundColor:
																		value === c ? hexToRgba(theme.primary500, 0.14) : theme.background100,
																	borderColor: value === c ? theme.primary500 : theme.outline200,
																	opacity: pressed ? 0.7 : 1,
																},
															]}
														>
															<Text
																style={[
																	styles.currencyChipText,
																	{ color: value === c ? theme.primary600 : theme.typography500 },
																]}
															>
																{c}
															</Text>
														</Pressable>
													))}
												</View>
											)}
										/>
									</View>
									{errors.costAmountInput && (
										<Text style={[styles.costErrorText, { color: theme.secondary500 }]}>
											{errors.costAmountInput.message}
										</Text>
									)}
									<View style={[styles.splitRow, { borderTopColor: theme.outline100 }]}>
										<Controller
											control={control}
											name='splitType'
											render={({ field: { value, onChange } }) => (
												<>
													<Pressable
														onPress={() => onChange('split_equally')}
														style={({ pressed }) => [
															styles.splitChip,
															{
																backgroundColor:
																	value === 'split_equally' ? hexToRgba(theme.primary500, 0.12) : theme.background100,
																borderColor: value === 'split_equally' ? theme.primary500 : theme.outline200,
																opacity: pressed ? 0.75 : 1,
															},
														]}
													>
														<Text
															style={[
																styles.splitChipText,
																{ color: value === 'split_equally' ? theme.primary600 : theme.typography500 },
															]}
														>
															Split equally
														</Text>
													</Pressable>
													<Pressable
														onPress={() => onChange('informational')}
														style={({ pressed }) => [
															styles.splitChip,
															{
																backgroundColor:
																	value === 'informational' ? hexToRgba(theme.primary500, 0.12) : theme.background100,
																borderColor: value === 'informational' ? theme.primary500 : theme.outline200,
																opacity: pressed ? 0.75 : 1,
															},
														]}
													>
														<Text
															style={[
																styles.splitChipText,
																{ color: value === 'informational' ? theme.primary600 : theme.typography500 },
															]}
														>
															My cost
														</Text>
													</Pressable>
												</>
											)}
										/>
									</View>
								</>
							)}
						</View>
						<View style={styles.bottomSpacer} />
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1 },
	flex: { flex: 1 },
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	headerCancel: { fontSize: 16, fontWeight: '500' },
	headerTitle: { fontSize: 17, fontWeight: '700' },
	headerSave: { fontSize: 16, fontWeight: '700' },
	content: { paddingHorizontal: 20, paddingTop: 24, gap: 16 },
	section: { gap: 10 },
	sectionLabel: {
		fontSize: 12,
		fontWeight: '800',
		letterSpacing: 2,
		textTransform: 'uppercase',
	},
	typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
	typeChip: {
		flexBasis: '31%',
		flexGrow: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderRadius: 12,
		borderWidth: 1.5,
		borderCurve: 'continuous',
	},
	typeChipEmoji: { fontSize: 16 },
	typeChipLabel: { fontSize: 13, fontWeight: '700', flexShrink: 1 },
	card: {
		borderRadius: 20,
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 8,
		borderCurve: 'continuous',
	},
	titleInput: {
		fontSize: 17,
		fontWeight: '600',
		minHeight: 44,
		paddingVertical: 8,
	},
	errorText: { fontSize: 12, fontWeight: '600' },
	costErrorText: { fontSize: 12, fontWeight: '600', marginTop: -4, marginBottom: 4, paddingHorizontal: 4 },
	toggleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingBottom: 8,
	},
	toggleLabelGroup: { gap: 2 },
	toggleLabel: { fontSize: 15, fontWeight: '600' },
	toggleHint: { fontSize: 12, fontWeight: '500' },
	dateRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		borderTopWidth: StyleSheet.hairlineWidth,
	},
	dateLabel: { fontSize: 14, fontWeight: '600' },
	fieldRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		paddingVertical: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	fieldIcon: { fontSize: 16, width: 24, textAlign: 'center', paddingTop: 2 },
	fieldInput: { flex: 1, fontSize: 15, fontWeight: '500' },
	descriptionInput: { minHeight: 72, textAlignVertical: 'top' },
	costAmountRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		paddingVertical: 12,
		borderTopWidth: StyleSheet.hairlineWidth,
	},
	costInput: {
		fontSize: 28,
		fontWeight: '700',
		fontVariant: ['tabular-nums'],
		minWidth: 80,
		flex: 1,
	},
	currencyRow: { flexDirection: 'row', gap: 6 },
	currencyChip: {
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 10,
		borderWidth: 1.5,
		borderCurve: 'continuous',
	},
	currencyChipText: { fontSize: 13, fontWeight: '700' },
	splitRow: {
		flexDirection: 'row',
		gap: 8,
		paddingVertical: 10,
		borderTopWidth: StyleSheet.hairlineWidth,
	},
	splitChip: {
		flex: 1,
		paddingVertical: 10,
		alignItems: 'center',
		borderRadius: 12,
		borderWidth: 1.5,
		borderCurve: 'continuous',
	},
	splitChipText: { fontSize: 13, fontWeight: '700' },
	bottomSpacer: { height: 40 },
});
