-- RLS Policies for Rofaqaa

-- Profiles RLS Policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view other profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Friend Requests RLS Policies
CREATE POLICY "Users can view own friend requests" ON public.friend_requests
  FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );

CREATE POLICY "Users can create friend requests" ON public.friend_requests
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update own requests" ON public.friend_requests
  FOR UPDATE USING (auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = receiver_id);

-- Friends RLS Policies
CREATE POLICY "Users can view own friends" ON public.friends
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert friendships" ON public.friends
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own friendships" ON public.friends
  FOR DELETE USING (auth.uid() = user_id);

-- Blocked Users RLS Policies
CREATE POLICY "Users can view own blocked list" ON public.blocked_users
  FOR SELECT USING (auth.uid() = blocker_id);

CREATE POLICY "Users can block other users" ON public.blocked_users
  FOR INSERT WITH CHECK (auth.uid() = blocker_id);

CREATE POLICY "Users can unblock users" ON public.blocked_users
  FOR DELETE USING (auth.uid() = blocker_id);

-- Chats RLS Policies
CREATE POLICY "Users can view own chats" ON public.chats
  FOR SELECT USING (
    auth.uid() = user_id_1 OR auth.uid() = user_id_2
  );

CREATE POLICY "Users can create chats" ON public.chats
  FOR INSERT WITH CHECK (
    auth.uid() = user_id_1 OR auth.uid() = user_id_2
  );

CREATE POLICY "Users can delete own chats" ON public.chats
  FOR DELETE USING (
    auth.uid() = user_id_1 OR auth.uid() = user_id_2
  );

-- Messages RLS Policies
CREATE POLICY "Users can view chat messages" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE chats.id = messages.chat_id
      AND (chats.user_id_1 = auth.uid() OR chats.user_id_2 = auth.uid())
    )
  );

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE chats.id = messages.chat_id
      AND (chats.user_id_1 = auth.uid() OR chats.user_id_2 = auth.uid())
    )
  );

CREATE POLICY "Users can update own messages" ON public.messages
  FOR UPDATE USING (auth.uid() = sender_id)
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can delete own messages" ON public.messages
  FOR DELETE USING (auth.uid() = sender_id);

-- Groups RLS Policies
CREATE POLICY "Members can view group" ON public.groups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = groups.id
      AND group_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create groups" ON public.groups
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Admins can update groups" ON public.groups
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = groups.id
      AND group_members.user_id = auth.uid()
      AND group_members.role IN ('owner', 'admin')
    )
  );

-- Group Members RLS Policies
CREATE POLICY "Members can view group members" ON public.group_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.group_members gm2
      WHERE gm2.group_id = group_members.group_id
      AND gm2.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage members" ON public.group_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.group_members gm2
      WHERE gm2.group_id = group_members.group_id
      AND gm2.user_id = auth.uid()
      AND gm2.role IN ('owner', 'admin')
    )
  );

-- Group Messages RLS Policies
CREATE POLICY "Members can view group messages" ON public.group_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_messages.group_id
      AND group_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Members can send messages" ON public.group_messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.group_members
      WHERE group_members.group_id = group_messages.group_id
      AND group_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own messages" ON public.group_messages
  FOR UPDATE USING (auth.uid() = sender_id)
  WITH CHECK (auth.uid() = sender_id);

-- Attachments RLS Policies
CREATE POLICY "Users can view attachments in accessible chats" ON public.attachments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.messages m
      WHERE m.id = attachments.message_id
      AND EXISTS (
        SELECT 1 FROM public.chats
        WHERE chats.id = m.chat_id
        AND (chats.user_id_1 = auth.uid() OR chats.user_id_2 = auth.uid())
      )
    )
    OR
    EXISTS (
      SELECT 1 FROM public.group_messages gm
      WHERE gm.id = attachments.group_message_id
      AND EXISTS (
        SELECT 1 FROM public.group_members
        WHERE group_members.group_id = gm.group_id
        AND group_members.user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can upload attachments" ON public.attachments
  FOR INSERT WITH CHECK (true);

-- Notifications RLS Policies
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Reports RLS Policies
CREATE POLICY "Users can create reports" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports" ON public.reports
  FOR SELECT USING (auth.uid() = reporter_id);
