import('./index.js')
  .then(() => {
    console.log('[Rivo] Bot application started successfully.');
  })
  .catch((error) => {
    console.error('[Rivo] Failed to start:', error);
    process.exit(1);
  });
