export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '14.5';
	};
	public: {
		Tables: {
			friendships: {
				Row: {
					created_at: string;
					id: string;
					receiver_id: string;
					requester_id: string;
					status: Database['public']['Enums']['friendship_status'];
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					id?: string;
					receiver_id: string;
					requester_id: string;
					status?: Database['public']['Enums']['friendship_status'];
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					receiver_id?: string;
					requester_id?: string;
					status?: Database['public']['Enums']['friendship_status'];
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'friendships_receiver_id_fkey';
						columns: ['receiver_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'friendships_requester_id_fkey';
						columns: ['requester_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
				];
			};
			trip_locations: {
				Row: {
					attribution: Json | null;
					city: string | null;
					country: string | null;
					country_code: string | null;
					created_at: string;
					formatted_address: string | null;
					id: string;
					latitude: number;
					longitude: number;
					name: string;
					region: string | null;
					source: string;
					source_place_id: string | null;
					timezone: string | null;
					trip_id: string;
				};
				Insert: {
					attribution?: Json | null;
					city?: string | null;
					country?: string | null;
					country_code?: string | null;
					created_at?: string;
					formatted_address?: string | null;
					id?: string;
					latitude: number;
					longitude: number;
					name: string;
					region?: string | null;
					source?: string;
					source_place_id?: string | null;
					timezone?: string | null;
					trip_id: string;
				};
				Update: {
					attribution?: Json | null;
					city?: string | null;
					country?: string | null;
					country_code?: string | null;
					created_at?: string;
					formatted_address?: string | null;
					id?: string;
					latitude?: number;
					longitude?: number;
					name?: string;
					region?: string | null;
					source?: string;
					source_place_id?: string | null;
					timezone?: string | null;
					trip_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'trip_locations_trip_id_fkey';
						columns: ['trip_id'];
						isOneToOne: false;
						referencedRelation: 'trips';
						referencedColumns: ['id'];
					},
				];
			};
			trip_members: {
				Row: {
					created_at: string;
					invited_by: string | null;
					role: Database['public']['Enums']['trip_role'];
					status: Database['public']['Enums']['participant_status'];
					trip_id: string;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					invited_by?: string | null;
					role?: Database['public']['Enums']['trip_role'];
					status?: Database['public']['Enums']['participant_status'];
					trip_id: string;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					invited_by?: string | null;
					role?: Database['public']['Enums']['trip_role'];
					status?: Database['public']['Enums']['participant_status'];
					trip_id?: string;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'trip_members_invited_by_fkey';
						columns: ['invited_by'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'trip_members_trip_id_fkey';
						columns: ['trip_id'];
						isOneToOne: false;
						referencedRelation: 'trips';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'trip_members_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
				];
			};
			trip_photos: {
				Row: {
					created_at: string;
					height: number | null;
					id: string;
					storage_path: string;
					taken_at: string | null;
					thumbnail_storage_path: string | null;
					trip_id: string;
					width: number | null;
				};
				Insert: {
					created_at?: string;
					height?: number | null;
					id?: string;
					storage_path: string;
					taken_at?: string | null;
					thumbnail_storage_path?: string | null;
					trip_id: string;
					width?: number | null;
				};
				Update: {
					created_at?: string;
					height?: number | null;
					id?: string;
					storage_path?: string;
					taken_at?: string | null;
					thumbnail_storage_path?: string | null;
					trip_id?: string;
					width?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'trip_photos_trip_id_fkey';
						columns: ['trip_id'];
						isOneToOne: false;
						referencedRelation: 'trips';
						referencedColumns: ['id'];
					},
				];
			};
			trip_timeline_items: {
				Row: {
					address: string | null;
					cost_amount: number | null;
					cost_currency: string | null;
					created_at: string;
					created_by: string | null;
					description: string | null;
					ends_at: string | null;
					id: string;
					latitude: number | null;
					location_label: string | null;
					longitude: number | null;
					paid_by: string | null;
					split_type: Database['public']['Enums']['split_type'] | null;
					starts_at: string | null;
					title: string;
					trip_id: string;
					type: Database['public']['Enums']['timeline_item_type'];
					updated_at: string;
					updated_by: string | null;
				};
				Insert: {
					address?: string | null;
					cost_amount?: number | null;
					cost_currency?: string | null;
					created_at?: string;
					created_by?: string | null;
					description?: string | null;
					ends_at?: string | null;
					id?: string;
					latitude?: number | null;
					location_label?: string | null;
					longitude?: number | null;
					paid_by?: string | null;
					split_type?: Database['public']['Enums']['split_type'] | null;
					starts_at?: string | null;
					title: string;
					trip_id: string;
					type: Database['public']['Enums']['timeline_item_type'];
					updated_at?: string;
					updated_by?: string | null;
				};
				Update: {
					address?: string | null;
					cost_amount?: number | null;
					cost_currency?: string | null;
					created_at?: string;
					created_by?: string | null;
					description?: string | null;
					ends_at?: string | null;
					id?: string;
					latitude?: number | null;
					location_label?: string | null;
					longitude?: number | null;
					paid_by?: string | null;
					split_type?: Database['public']['Enums']['split_type'] | null;
					starts_at?: string | null;
					title?: string;
					trip_id?: string;
					type?: Database['public']['Enums']['timeline_item_type'];
					updated_at?: string;
					updated_by?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'trip_timeline_items_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'trip_timeline_items_paid_by_fkey';
						columns: ['paid_by'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'trip_timeline_items_trip_id_fkey';
						columns: ['trip_id'];
						isOneToOne: false;
						referencedRelation: 'trips';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'trip_timeline_items_updated_by_fkey';
						columns: ['updated_by'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
				];
			};
			trips: {
				Row: {
					cover_photo_id: string | null;
					created_at: string;
					end_date: string | null;
					id: string;
					note: string | null;
					owner_id: string;
					start_date: string | null;
					status: Database['public']['Enums']['trip_status'];
					title: string;
					updated_at: string;
				};
				Insert: {
					cover_photo_id?: string | null;
					created_at?: string;
					end_date?: string | null;
					id?: string;
					note?: string | null;
					owner_id: string;
					start_date?: string | null;
					status?: Database['public']['Enums']['trip_status'];
					title: string;
					updated_at?: string;
				};
				Update: {
					cover_photo_id?: string | null;
					created_at?: string;
					end_date?: string | null;
					id?: string;
					note?: string | null;
					owner_id?: string;
					start_date?: string | null;
					status?: Database['public']['Enums']['trip_status'];
					title?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'trips_cover_photo_id_fkey';
						columns: ['cover_photo_id'];
						isOneToOne: false;
						referencedRelation: 'trip_photos';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'trips_owner_id_fkey';
						columns: ['owner_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
				];
			};
			users: {
				Row: {
					avatar_index: number;
					created_at: string;
					friend_code: string;
					gender: Database['public']['Enums']['gender'];
					id: string;
					name: string;
					updated_at: string;
				};
				Insert: {
					avatar_index?: number;
					created_at?: string;
					friend_code?: string;
					gender: Database['public']['Enums']['gender'];
					id: string;
					name: string;
					updated_at?: string;
				};
				Update: {
					avatar_index?: number;
					created_at?: string;
					friend_code?: string;
					gender?: Database['public']['Enums']['gender'];
					id?: string;
					name?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			delete_user_permanently: {
				Args: { target_user_id: string };
				Returns: Json;
			};
			generate_friend_code: { Args: never; Returns: string };
		};
		Enums: {
			friendship_status: 'pending' | 'accepted' | 'declined';
			gender: 'male' | 'female';
			participant_status: 'pending' | 'confirmed' | 'declined';
			split_type: 'split_equally' | 'informational';
			timeline_item_type: 'transport' | 'stay' | 'activity' | 'food' | 'note' | 'other';
			trip_role: 'owner' | 'editor';
			trip_status: 'planned' | 'saved';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {
			friendship_status: ['pending', 'accepted', 'declined'],
			gender: ['male', 'female'],
			participant_status: ['pending', 'confirmed', 'declined'],
			split_type: ['split_equally', 'informational'],
			timeline_item_type: ['transport', 'stay', 'activity', 'food', 'note', 'other'],
			trip_role: ['owner', 'editor'],
			trip_status: ['planned', 'saved'],
		},
	},
} as const;
