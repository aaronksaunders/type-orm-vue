import "reflect-metadata";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import "@ionic/vue/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import appDataSource from "./data-source";
import { sqliteConnection } from "./data-source";
import { Capacitor } from "@capacitor/core";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";
customElements.define("jeep-sqlite", JeepSqlite);

(async () => {
  try {
    if (Capacitor.getPlatform() !== "web") {
      const result = await appDataSource.dataSource.initialize();
      console.log("Data Source Initialized: ", result);
      // Now depending on the Framework render your APP
      const app = createApp(App).use(IonicVue).use(router);

      router.isReady().then(() => {
        app.mount("#app");
      });
    } else {
      window.addEventListener("DOMContentLoaded", async () => {
        const jeepEl = document.createElement("jeep-sqlite");
        document.body.appendChild(jeepEl);
        customElements
          .whenDefined("jeep-sqlite")
          .then(async () => {
            await sqliteConnection.initWebStore();
            const result = await appDataSource.dataSource.initialize();
            console.log("Data Source Initialized: ", result);
            // Now depending on the Framework render your APP
            const app = createApp(App).use(IonicVue).use(router);

            router.isReady().then(() => {
              app.mount("#app");
            });
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
            throw new Error(`Error: ${err}`);
          });
      });
    }
  } catch (error) {
    alert("Error initializing data source: " + error);
  }
})();
