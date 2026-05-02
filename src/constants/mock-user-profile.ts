import type { Gender, UserProfile } from '@/types/types';

export const MOCK_USER_PROFILE: UserProfile = {
	id: 'u-001',
	name: 'Adrian Szablowski',
	userCode: '#A7K9-P3M2',
	gender: 'male',
	avatarIndex: 2,
};

export const MALE_AVATARS = [
	require('@/assets/avatars/micah/male/micah-1777720874635.png'),
	require('@/assets/avatars/micah/male/micah-1777720939383.png'),
	require('@/assets/avatars/micah/male/micah-1777720946404.png'),
	require('@/assets/avatars/micah/male/micah-1777720950907.png'),
	require('@/assets/avatars/micah/male/micah-1777720958121.png'),
	require('@/assets/avatars/micah/male/micah-1777720975529.png'),
	require('@/assets/avatars/micah/male/micah-1777721095372.png'),
	require('@/assets/avatars/micah/male/micah-1777721115120.png'),
];

export const FEMALE_AVATARS = [
	require('@/assets/avatars/micah/female/micah-1777720897289.png'),
	require('@/assets/avatars/micah/female/micah-1777720917325.png'),
	require('@/assets/avatars/micah/female/micah-1777720927837.png'),
	require('@/assets/avatars/micah/female/micah-1777720936135.png'),
	require('@/assets/avatars/micah/female/micah-1777720983517.png'),
	require('@/assets/avatars/micah/female/micah-1777721079422.png'),
	require('@/assets/avatars/micah/female/micah-1777721645566.png'),
];

export function getAvatarSource(gender: Gender, avatarIndex: number) {
	const avatars = gender === 'male' ? MALE_AVATARS : FEMALE_AVATARS;

	return avatars[avatarIndex] ?? avatars[0];
}
