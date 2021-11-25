<template>
  <div>
    <v-app-bar
      app
      color="#00479b"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      class="rounded-lg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient=" rgb(255 255 255 / 42%), rgba(0 71 155 / 48%)"
        ></v-img>
      </template>

      <v-col>
        <v-toolbar-title> <h1>Pexele Website</h1> </v-toolbar-title>
      </v-col>

      <template v-slot:extension>
        <v-tabs centered dark>
          <v-tab>
            <router-link to="/"><h3>搜尋相片</h3> </router-link>
          </v-tab>

          <v-tab>
            <router-link to="video"><h3>搜尋影片</h3> </router-link>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </div>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.fade-enter-active, 
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter {
  transform: translatey(500px);
  opacity: 0;
}

.fade-leave-to {
  transform: translatey(-500px);
  opacity: 0;
}

a {
  text-decoration: none;
  h3 {
    color: white;
  }
}
</style>