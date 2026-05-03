import { Button } from '@expo/ui/swift-ui';
import type { ComponentProps } from 'react';
import { Enums, Tables } from '../../database.types';

export type Maybe<T> = T | null | undefined;

export interface Response<T> {
	success: boolean;
	message: string;
	data?: T;
	errorReason?: AuthErrorReason;
}

export type SfSystemImageIcon = NonNullable<ComponentProps<typeof Button>['systemImage']>;

export type AuthErrorReason = 'email_taken' | 'weak_password';

export type Gender = Enums<'gender'>;
export type AvatarPool = 'pool_a' | 'pool_b';
export type FriendshipStatus = Enums<'friendship_status'>;
export type TripStatus = Enums<'trip_status'>;
export type TripFilter = 'all' | TripStatus;
export type TripRole = Enums<'trip_role'>;
export type TimelineItemType = Enums<'timeline_item_type'>;
export type SplitType = Enums<'split_type'>;
export type ParticipantStatus = Enums<'participant_status'>;
export type RequestDirection = 'incoming' | 'outgoing';
export type FriendsTab = 'friends' | 'requests';
export type SearchStatus = 'idle' | 'loading' | 'found' | 'not_found' | 'sent';

export type UserData = Maybe<Tables<'users'>>;

export type FoundUser = Pick<Tables<'users'>, 'id' | 'name' | 'friend_code'> & {
	gender: Gender;
	avatar_index: number;
};

export type Friend = FoundUser & {
	shared_trips_count: number;
};

export type FriendRequest = FoundUser & {
	direction: RequestDirection;
	sent_at: string;
};

export interface TripPhoto {
	id: string;
	url: string;
}

export interface TripParticipant {
	id: string;
	name: string;
	gender: Gender;
	avatar_index: number;
	status: ParticipantStatus;
}

export type TimelineItem = Omit<Tables<'trip_timeline_items'>, 'type' | 'split_type'> & {
	type: TimelineItemType;
	split_type: SplitType | null;
};

export interface MockTrip {
	id: string;
	status: TripStatus;
	title: string;
	city: string;
	country: string;
	flag: string;
	startDate: string;
	endDate?: string;
	note?: string;
	photoCount: number;
	photos: TripPhoto[];
	coverPhoto?: TripPhoto;
	participants: TripParticipant[];
	latitude: number;
	longitude: number;
	timelineItems?: TimelineItem[];
}

export interface TripSection {
	title: string;
	data: MockTrip[];
}
