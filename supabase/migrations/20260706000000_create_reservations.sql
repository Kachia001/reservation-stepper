CREATE TABLE IF NOT EXISTS public.reservations (
  id uuid PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('consulting', 'tour', 'service')),
  visitor_name text NOT NULL,
  reserved_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL
);
