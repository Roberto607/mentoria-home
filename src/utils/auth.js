// Simple localStorage-backed auth helpers for testing only
export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('mentorAppUsers') || '[]');
  } catch (e) {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem('mentorAppUsers', JSON.stringify(users));
}

export function addUser(user) {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
  return user;
}

export function findUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
}

export function authenticate(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
}

export function setCurrentUser(user) {
  localStorage.setItem('mentorAppCurrentUser', JSON.stringify(user));
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('mentorAppCurrentUser');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function updateUser(user) {
  const users = getUsers().map((existing) => existing.email === user.email ? user : existing);
  saveUsers(users);
  setCurrentUser(user);
  return user;
}

export function logout() {
  localStorage.removeItem('mentorAppCurrentUser');
}
