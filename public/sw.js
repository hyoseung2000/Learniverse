self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.text() : 'no payload';
  event.waitUntil(
    self.registration.showNotification('Web Push Notification', {
      body: payload,
    }),
  );
});
