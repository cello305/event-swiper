import { supabase } from './supabaseClient';

export default async function HomePage() {
  const users = await fetchUsersWithEvents();

  return (
    <div>
      <h1>Users and Events</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2>{user.username} ({user.email})</h2>
            <h3>Events:</h3>
            <ul>
              {user.events.map((event) => (
                <li key={event.id}>
                  {event.title} - {new Date(event.event_date).toDateString()}
                  <p>{event.description}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function fetchUsersWithEvents() {
  // Fetch users from Supabase
  const { data: users, error: userError } = await supabase.from('users').select('*');

  if (userError) {
    console.error('Error fetching users:', userError);
    return [];
  }

  // For each user, fetch associated events
  const userWithEventsPromises = users.map(async (user) => {
    const { data: events, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', user.id);

    if (eventError) {
      console.error('Error fetching events for user:', user.username, eventError);
      return { ...user, events: [] };
    }

    return { ...user, events };
  });

  // Wait for all promises to resolve
  const usersWithEvents = await Promise.all(userWithEventsPromises);
  return usersWithEvents;
}