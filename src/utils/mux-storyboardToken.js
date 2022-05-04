function setupStoryboardTokenHelper(player) {
  player.storyboardToken = function (options) {
    player.options().storyboardToken = options || undefined;
    return;
  };
}

export { setupStoryboardTokenHelper };
