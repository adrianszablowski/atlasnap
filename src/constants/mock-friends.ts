import type { FoundUser, Friend, FriendRequest } from '@/types/friend';

export const MOCK_MY_FRIEND_CODE = '#A7K9-P3M2';

export const mockFriends: Friend[] = [
	{
		id: '1',
		name: 'Emma Wilson',
		friendCode: '#E7K2-W9M4',
		gender: 'female',
		avatarIndex: 0,
		sharedTripsCount: 4,
	},
	{
		id: '2',
		name: 'Marco Rossi',
		friendCode: '#M3R7-C2X1',
		gender: 'male',
		avatarIndex: 0,
		sharedTripsCount: 2,
	},
	{
		id: '3',
		name: 'Sophia Chen',
		friendCode: '#S9C4-H6T8',
		gender: 'female',
		avatarIndex: 3,
		sharedTripsCount: 6,
	},
	{
		id: '4',
		name: 'Lucas Müller',
		friendCode: '#L2M8-U5K3',
		gender: 'male',
		avatarIndex: 5,
		sharedTripsCount: 1,
	},
	{
		id: '5',
		name: 'Aisha Patel',
		friendCode: '#A5P1-T7N9',
		gender: 'female',
		avatarIndex: 1,
		sharedTripsCount: 3,
	},
];

export const mockFriendRequests: FriendRequest[] = [
	{
		id: 'r1',
		name: 'Jake Thompson',
		friendCode: '#J8T3-K1P6',
		gender: 'male',
		avatarIndex: 2,
		direction: 'incoming',
		sentAt: '2024-01-15',
	},
	{
		id: 'r2',
		name: 'Priya Kumar',
		friendCode: '#P4K9-R2M7',
		gender: 'female',
		avatarIndex: 4,
		direction: 'incoming',
		sentAt: '2024-01-14',
	},
	{
		id: 'r3',
		name: 'Tom Hansen',
		friendCode: '#T6H2-A8N4',
		gender: 'male',
		avatarIndex: 7,
		direction: 'outgoing',
		sentAt: '2024-01-12',
	},
];

export const MOCK_FOUND_USER: FoundUser = {
	id: 'found1',
	name: 'Alex Rivera',
	friendCode: '#A7X4-R9K2',
	gender: 'male',
	avatarIndex: 6,
};
