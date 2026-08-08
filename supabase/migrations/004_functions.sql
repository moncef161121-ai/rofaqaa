-- Function to get mutual friends
CREATE OR REPLACE FUNCTION public.get_mutual_friends(
  user_id_1 UUID,
  user_id_2 UUID
)
RETURNS TABLE(friend_id UUID) AS $$
BEGIN
  RETURN QUERY
  SELECT f1.friend_id
  FROM public.friends f1
  WHERE f1.user_id = user_id_1
  AND EXISTS (
    SELECT 1 FROM public.friends f2
    WHERE f2.user_id = user_id_2
    AND f2.friend_id = f1.friend_id
  );
END;
$$ LANGUAGE plpgsql;

-- Function to check if user can message another
CREATE OR REPLACE FUNCTION public.can_message_user(
  sender_id UUID,
  receiver_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if not blocked
  IF EXISTS (
    SELECT 1 FROM public.blocked_users
    WHERE blocker_id = receiver_id AND blocked_id = sender_id
  ) THEN
    RETURN FALSE;
  END IF;

  -- Check if friends
  RETURN EXISTS (
    SELECT 1 FROM public.friends
    WHERE (user_id = sender_id AND friend_id = receiver_id)
    OR (user_id = receiver_id AND friend_id = sender_id)
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get unread message count
CREATE OR REPLACE FUNCTION public.get_unread_count(
  user_id UUID
)
RETURNS TABLE(chat_id UUID, unread_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.chat_id,
    COUNT(*)::BIGINT
  FROM public.messages m
  WHERE (
    SELECT user_id_1 = $1 OR user_id_2 = $1
    FROM public.chats c
    WHERE c.id = m.chat_id
  )
  AND m.sender_id != $1
  AND m.read_at IS NULL
  GROUP BY m.chat_id;
END;
$$ LANGUAGE plpgsql;
