import type { FoundUser, Friend, FriendRequest } from '@/types/types';

export const MOCK_MY_FRIEND_CODE = '#A7K9-P3M2';

export const mockFriends: Friend[] = [
	{
		id: '1',
		name: 'Emma Wilson',
		friend_code: '#E7K2-W9M4',
		gender: 'female',
		avatar_index: 0,
		shared_trips_count: 4,
	},
	{
		id: '2',
		name: 'Marco Rossi',
		friend_code: '#M3R7-C2X1',
		gender: 'male',
		avatar_index: 0,
		shared_trips_count: 2,
	},
	{
		id: '3',
		name: 'Sophia Chen',
		friend_code: '#S9C4-H6T8',
		gender: 'female',
		avatar_index: 3,
		shared_trips_count: 6,
	},
	{
		id: '4',
		name: 'Lucas Müller',
		friend_code: '#L2M8-U5K3',
		gender: 'male',
		avatar_index: 5,
		shared_trips_count: 1,
	},
	{
		id: '5',
		name: 'Aisha Patel',
		friend_code: '#A5P1-T7N9',
		gender: 'female',
		avatar_index: 1,
		shared_trips_count: 3,
	},
];

export const mockFriendRequests: FriendRequest[] = [
	{
		id: 'r1',
		name: 'Jake Thompson',
		friend_code: '#J8T3-K1P6',
		gender: 'male',
		avatar_index: 2,
		direction: 'incoming',
		sent_at: '2024-01-15',
	},
	{
		id: 'r2',
		name: 'Priya Kumar',
		friend_code: '#P4K9-R2M7',
		gender: 'female',
		avatar_index: 4,
		direction: 'incoming',
		sent_at: '2024-01-14',
	},
	{
		id: 'r3',
		name: 'Tom Hansen',
		friend_code: '#T6H2-A8N4',
		gender: 'male',
		avatar_index: 7,
		direction: 'outgoing',
		sent_at: '2024-01-12',
	},
];

export const MOCK_FOUND_USER: FoundUser = {
	id: 'found1',
	name: 'Alex Rivera',
	friend_code: '#A7X4-R9K2',
	gender: 'male',
	avatar_index: 6,
};
