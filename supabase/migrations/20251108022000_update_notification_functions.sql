-- Create the updated get_notifications function
CREATE OR REPLACE FUNCTION public.get_notifications(p_user_id uuid)
RETURNS TABLE(
    id BIGINT,
    user_id UUID,
    type TEXT,
    message TEXT,
    metadata JSONB,
    is_read BOOLEAN,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ,
    actors JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH unread_notifications AS (
        SELECT
            n.id,
            n.user_id,
            n.type,
            n.message,
            n.metadata,
            n.is_read,
            n.read_at,
            n.created_at,
            -- Extract actor from metadata, ensuring sender_id is not null
            CASE
                WHEN n.metadata->>'sender_id' IS NOT NULL THEN
                    jsonb_build_object('id', up.user_id, 'username', up.username)
                ELSE
                    NULL
            END as actor
        FROM
            public.notifications n
        JOIN
            public.user_notification_preferences unp ON n.user_id = unp.user_id AND n.type = unp.notification_type
        LEFT JOIN
            public.user_profiles up ON (n.metadata->>'sender_id')::uuid = up.user_id
        WHERE
            n.user_id = p_user_id AND unp.is_enabled = true AND n.is_read = false
    ),
    -- Aggregate notifications by type and a grouping key from metadata
    aggregated_notifications AS (
        SELECT
            MAX(id) as id,
            user_id,
            type,
            -- Construct a dynamic message based on the count of actors
            CASE
                WHEN COUNT(*) > 1 THEN
                    'You have ' || COUNT(*) || ' new ' || type || ' notifications.'
                ELSE
                    (array_agg(message ORDER BY created_at DESC))[1]
            END as message,
            -- Use the metadata from the most recent notification
            (array_agg(metadata ORDER BY created_at DESC))[1] as metadata,
            false as is_read,
            NULL::timestamptz as read_at,
            MAX(created_at) as created_at,
            jsonb_agg(actor) FILTER (WHERE actor IS NOT NULL) as actors
        FROM
            unread_notifications
        GROUP BY
            user_id, type,
            -- Group by a common identifier in the metadata if available
            metadata->>'listing_id', metadata->>'topic_id', metadata->>'insight_id'
    )
    -- Select aggregated unread notifications and all read notifications
    SELECT
        id,
        user_id,
        type,
        message,
        metadata,
        is_read,
        read_at,
        created_at,
        actors
    FROM
        aggregated_notifications
    UNION ALL
    SELECT
        n.id,
        n.user_id,
        n.type,
        n.message,
        n.metadata,
        n.is_read,
        n.read_at,
        n.created_at,
        NULL::jsonb as actors
    FROM
        public.notifications n
    WHERE
        n.user_id = p_user_id AND n.is_read = true
    ORDER BY
        created_at DESC;
END;
$$;
