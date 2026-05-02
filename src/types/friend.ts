import type { Gender } from './types';

export type RequestDirection = 'incoming' | 'outgoing';
export type FriendsTab = 'friends' | 'requests';
export type SearchStatus = 'idle' | 'loading' | 'found' | 'not_found' | 'sent';

export interface Friend {
	id: string;
	name: string;
	friendCode: string;
	gender: Gender;
	avatarIndex: number;
	sharedTripsCount: number;
}

export interface FriendRequest {
	id: string;
	name: string;
	friendCode: string;
	gender: Gender;
	avatarIndex: number;
	direction: RequestDirection;
	sentAt: string;
}

export interface FoundUser {
	id: string;
	name: string;
	friendCode: string;
	gender: Gender;
	avatarIndex: number;
}
