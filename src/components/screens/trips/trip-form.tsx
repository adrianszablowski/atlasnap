import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import type { TripFormValues } from '@/components/screens/trips/schemas';
import { DatePicker, Host, TextField } from '@expo/ui/swift-ui';
import { datePickerStyle, font, frame } from '@expo/ui/swift-ui/modifiers';
import times from 'lodash/times';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import {
	Alert,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from 'react-native';

const MAX_PHOTOS = 10;
const PHOTO_COLUMNS = 3;

interface TripFormProps {
	control: Control<TripFormValues>;
	errors: FieldErrors<TripFormValues>;
	photos: { id: string; url: string }[];
	formKey?: string | number;
}

export function TripForm({ control, errors, photos, formKey }: Readonly<TripFormProps>) {
	const theme = useTheme();
	const { width: screenWidth } = useWindowDimensions();

	const photoSlotSize = Math.floor((screenWidth - 40 - PHOTO_COLUMNS * 10) / PHOTO_COLUMNS);
	const cityFieldWidth = screenWidth - 106;

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
								placeholder='Roman Holiday…'
								placeholderTextColor={theme.outline200}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								returnKeyType='next'
								autoCapitalize='words'
							/>
						)}
					/>
					{errors.title ? (
						<Text style={[styles.errorText, { color: theme.secondary500 }]}>{errors.title.message}</Text>
					) : null}
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
					{errors.city ? (
						<Text style={[styles.errorText, { color: theme.secondary500 }]}>{errors.city.message}</Text>
					) : null}
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
					{errors.country ? (
						<Text style={[styles.errorText, { color: theme.secondary500 }]}>{errors.country.message}</Text>
					) : null}
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
					<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>MEMORIES</Text>
					<Controller
						control={control}
						name='note'
						render={({ field: { value, onChange, onBlur } }) => (
							<TextInput
								style={[styles.noteInput, { color: theme.typography900 }]}
								placeholder='Colosseum at sunset, best carbonara, wandering the Forum all day…'
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
				<View style={styles.section}>
					<View style={styles.photoHeader}>
						<Text style={[styles.sectionLabel, { color: theme.typography400 }]}>PHOTOS</Text>
						<Text style={[styles.photoCount, { color: theme.typography400 }]}>
							{photos.length} / {MAX_PHOTOS}
						</Text>
					</View>
					<Text style={[styles.photoHint, { color: theme.typography500 }]}>
						First photo becomes the cover of your trip
					</Text>
					<View style={styles.photoGrid}>
						{times(MAX_PHOTOS, (index) => {
							const photo = photos[index];
							const isCover = index === 0;
							return (
								<Pressable
									key={index}
									onPress={() => Alert.alert('Coming Soon', 'Photo upload will be available in a future update.')}
									style={({ pressed }) => [
										styles.photoSlot,
										{
											width: photoSlotSize,
											height: photoSlotSize,
											backgroundColor: isCover ? hexToRgba(theme.primary500, 0.06) : theme.background100,
											borderColor: isCover ? theme.primary300 : theme.outline200,
											opacity: pressed ? 0.7 : 1,
										},
									]}
								>
									{photo ? null : (
										<View style={styles.photoSlotContent}>
											<Text style={styles.photoEmoji}>{isCover ? '🖼️' : '📷'}</Text>
											<Text style={[styles.photoSlotLabel, { color: isCover ? theme.primary500 : theme.outline400 }]}>
												{isCover ? 'Cover' : 'Add'}
											</Text>
										</View>
									)}
								</Pressable>
							);
						})}
					</View>
				</View>
				<View style={styles.bottomSpacer} />
			</ScrollView>
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
	photoHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	photoCount: { fontSize: 12, fontWeight: '600' },
	photoHint: { fontSize: 13, fontWeight: '500', marginTop: -2 },
	photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
	photoSlot: { borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
	photoSlotContent: { alignItems: 'center', gap: 4 },
	photoEmoji: { fontSize: 20 },
	photoSlotLabel: { fontSize: 11, fontWeight: '700' },
	bottomSpacer: { height: 48 },
});
