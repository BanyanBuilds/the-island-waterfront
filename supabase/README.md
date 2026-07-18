# Supabase setup

1. Create a new Supabase project.
2. Open **SQL Editor → New query**.
3. Paste and run the complete contents of `schema.sql`.
4. Create the owner account under **Authentication → Users**.
5. Copy that user's UUID and run:

```sql
insert into public.admin_users (user_id, display_name)
values ('YOUR-AUTH-USER-UUID', 'Owner');
```

The current public website uses local content and therefore runs without Supabase environment variables. The included schema is ready for the admin/CMS connection when that interface is enabled.
