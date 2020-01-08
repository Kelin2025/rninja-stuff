import { createStore, createEvent, merge } from "effector";

import { goTo, onRouteChanged } from "~lib/routing";

const TOKEN = "g9CUipwnCk2dzhOrAiVg";

export const authorized = createEvent();
export const notAuthorized = createEvent();

export const $isAuthChecked = createStore(false);
export const $isAuthorized = createStore(false);

onRouteChanged(newRoute => {
  if (newRoute.name === "auth") {
    if (newRoute.params.token === TOKEN) {
      authorized();
      goTo({ name: "home" });
      localStorage.token = TOKEN;
    } else {
      notAuthorized();
    }
  } else {
    if (localStorage.token === TOKEN) {
      authorized();
    } else {
      notAuthorized();
    }
  }
});

$isAuthChecked.on(merge([authorized, notAuthorized]), () => true);

$isAuthorized.on(authorized, () => true).on(notAuthorized, () => false);

notAuthorized.watch(() => {
  location.href = "https://twitch.tv/RubberNinja";
});

// Prevent Heroku from terminating the instance
setTimeout(() => {
  location.reload();
}, 20 * 60 * 1000);
