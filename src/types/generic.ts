export interface Response<T> {
  entity: string;
  count: number;
  items: T[];
}

export interface GenericFields {
  id: string;
  entity: string;
  batch_id?: string;
  created_at: number;
  active: boolean;
}

export interface Pageable {
  /** Timestamp, in Unix, from when contacts are to be fetched. */
  from?: number;
  /** Timestamp, in Unix, till when contacts are to be fetched. */
  to?: number;
  /** The number of contacts to be fetched. Default = 10. Maximum = 100. This can be used for pagination, in combination with skip. */
  count?: number;
  /** The number of contacts to be skipped. Default = 0. This can be used for pagination, in combination with count. */
  skip?: number;
}
