import type { Gender } from './types';

export interface TripPhoto {
	id: string;
	url: string;
}

export type TripStatus = 'planned' | 'saved';
export type TripFilter = 'all' | TripStatus;
export type TripRole = 'owner' | 'editor';
export type TimelineItemType = 'transport' | 'stay' | 'activity' | 'food' | 'note' | 'other';
export type SplitType = 'split_equally' | 'informational';

export type ParticipantStatus = 'pending' | 'confirmed' | 'declined';

export interface TripParticipant {
	id: string;
	name: string;
	gender: Gender;
	avatarIndex: number;
	status: ParticipantStatus;
}

export interface TimelineItem {
	id: string;
	tripId: string;
	type: TimelineItemType;
	title: string;
	description?: string;
	startsAt?: string;
	endsAt?: string;
	locationLabel?: string;
	address?: string;
	latitude?: number;
	longitude?: number;
	costAmount?: number;
	costCurrency?: string;
	splitType?: SplitType;
	paidBy?: string;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
}

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
