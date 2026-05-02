import type { Gender } from './types';

export interface TripPhoto {
	id: string;
	url: string;
}

export type ParticipantStatus = 'pending' | 'confirmed' | 'declined';

export interface TripParticipant {
	id: string;
	name: string;
	gender: Gender;
	avatarIndex: number;
	status: ParticipantStatus;
}

export interface MockTrip {
	id: string;
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
}

export interface TripSection {
	title: string;
	data: MockTrip[];
}
